from django.conf import settings
from django.core.cache import cache
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Holiday, Country
from datetime import datetime
from .Serializers import HolidaySerializer, CountrySerializer
import requests


@api_view(["GET"])
def fetch_holidays(request):
    """
    Fetch holidays based on the provided country, year, and optional filters such as month,
    start date, end date, and search term. Results are cached to optimize performance.

    Args:
        request: The HTTP request object containing query parameters.

    Returns:
        Response: A Response object containing the list of holidays or error messages.
    """
    data = Holiday.objects.all().count()
    country = request.query_params.get('country')
    year = request.query_params.get('year')
    month = request.query_params.get('month', None)
    start_date_str = request.query_params.get('startDate', None)
    end_date_str = request.query_params.get('endDate', None)
    search = request.query_params.get('searchTerm', None)

    try:
        start_date = datetime.fromisoformat(start_date_str) if start_date_str else None
        end_date = datetime.fromisoformat(end_date_str) if end_date_str else None
    except ValueError:
        return Response({"error": "Invalid date format. Use ISO 8601 format (YYYY-MM-DDTHH:MM:SS)"},
                        status=status.HTTP_400_BAD_REQUEST)

    if not country or not year:
        return Response({"error": "Country and Year are required"}, status=status.HTTP_400_BAD_REQUEST)

    cache_key = f"holidays_{country}_{year}"
    cached_data = cache.get(cache_key)

    if cached_data:
        data = cached_data
        holidays_query = Holiday.objects.filter(country__country_code=country)

        if search:
            holidays_query = holidays_query.filter(name__icontains=search)

        if start_date and end_date:
            holidays_query = holidays_query.filter(iso_date__range=[start_date.date(), end_date.date()])

        if holidays_query:
            holiday_serializer = HolidaySerializer(holidays_query, many=True)
            data = holiday_serializer.data
        else:
            holiday_serializer = HolidaySerializer(data, many=True)
            data = holiday_serializer.data

        return Response(data)

    url = f"https://calendarific.com/api/v2/holidays?api_key={settings.CALENDARIFIC_API_KEY}&country={country}&year={year}"

    if month:
        url += f"&month={month}"

    response = requests.get(url)

    if response.status_code != 200:
        return Response({"error": "Failed to fetch holidays data from Calendarific"},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    holidays_data = response.json()

    holidays = []
    for holiday in holidays_data.get('response', {}).get('holidays', []):
        name = holiday.get('name')
        description = holiday.get('description', '')
        iso_date = holiday.get('date', {}).get('iso')
        primary_type = holiday.get('type')[0] if holiday.get('type') else 'Unknown'
        date_object = datetime.fromisoformat(iso_date)

        formatted_date = date_object.date()

        if not Holiday.objects.filter(name=name, iso_date=formatted_date, country__country_code=country,
                                      primary_type=primary_type).exists():
            Holiday.objects.create(
                name=name,
                description=description,
                country=Country.objects.get(country_code=country),
                iso_date=formatted_date,
                year=int(iso_date[:4]) if iso_date else None,
                month=int(iso_date[5:7]) if iso_date else None,
                day=int(iso_date[8:10]) if iso_date else None,
                primary_type=primary_type,
                types=holiday.get('type', []),
                canonical_url=holiday.get('url', ''),
                url_id=holiday.get('id', ''),
                locations=holiday.get('locations', 'All'),
                states=holiday.get('states', [])
            )

        holidays_query = Holiday.objects.filter(country__country_code=country, year=year)
        obj = HolidaySerializer(holidays_query, many=True)
        holidays = obj.data

    cache.set(cache_key, holidays, timeout=86400)

    return Response(holidays)


@api_view(['GET'])
def fetch_country(request):
    """
    Fetch the list of countries available in the system.

    Args:
        request: The HTTP request object.

    Returns:
        Response: A Response object containing the list of countries.
    """
    data = Country.objects.all()
    serializer_obj = CountrySerializer(data, many=True)
    return Response(serializer_obj.data)


@api_view(['GET'])
def fetch_holiday(request, id):
    """
    Fetch details of a specific holiday by its ID.

    Args:
        request: The HTTP request object.
        id (int): The ID of the holiday to fetch.

    Returns:
        Response: A Response object containing the holiday details or an error message.
    """
    try:
        data = Holiday.objects.get(id=id)
        serializer_obj = HolidaySerializer(data, many=False)
        return Response(serializer_obj.data)
    except Holiday.DoesNotExist:
        return Response({"message": "no data found"}, status=404)

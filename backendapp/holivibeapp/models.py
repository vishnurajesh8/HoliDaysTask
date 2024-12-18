from django.db import models


class Country(models.Model):
    """
    Model representing a country.

    Attributes:
        country_code (str): ISO 3166-1 alpha-3 code for the country, used as the primary key.
        country_name (str): Full name of the country.
    """
    country_code = models.CharField(max_length=3, unique=True, primary_key=True)
    country_name = models.CharField(max_length=100)

    def __str__(self):
        """
        Returns the string representation of the country, which is its name.

        Returns:
            str: The name of the country.
        """
        return self.country_name


class Holiday(models.Model):
    """
    Model representing a holiday.

    Attributes:
        name (str): Name of the holiday.
        description (str): Description of the holiday.
        country (ForeignKey): Foreign key referencing the Country model.
        iso_date (date): ISO 8601 formatted date of the holiday.
        year (int): Year of the holiday.
        month (int): Month of the holiday.
        day (int): Day of the holiday.
        primary_type (str): Primary type of the holiday.
        types (JSONField): JSON field to store types/categories of the holiday.
        canonical_url (str): URL providing detailed information about the holiday.
        url_id (str): Unique ID for the holiday URL.
        locations (str): Locations where the holiday is observed.
        states (JSONField): JSON field to store state-specific information.
    """
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    country = models.ForeignKey(Country, on_delete=models.SET_NULL, null=True)
    iso_date = models.DateField(null=True)
    year = models.IntegerField(null=True)
    month = models.IntegerField(null=True)
    day = models.IntegerField(null=True)
    primary_type = models.CharField(max_length=100, null=True)
    types = models.JSONField(null=True)
    canonical_url = models.URLField(blank=True, null=True)
    url_id = models.CharField(max_length=255, blank=True, null=True)
    locations = models.CharField(max_length=255, null=True)
    states = models.JSONField(blank=True, null=True)

    def __str__(self):
        """
        Returns the string representation of the holiday, which is its name.

        Returns:
            str: The name of the holiday.
        """
        return self.name

import requests

def get_country_codes():
    # Replace 'YOUR_API_KEY' with your actual Calendarific API key
    url = 'https://calendarific.com/api/v2/countries'
    params = {
        'api_key': 'IGmhEpQdN3s5eTIOlZZH48bdx6I40PV9'
    }

    response = requests.get(url, params=params)

    if response.status_code == 200:

        data = response.json()
        print(data)
        countries = data.get('response', {}).get('countries', [])

        # Extract country codes and names
        country_codes = [(country['iso-3166'], country['country_name']) for country in countries]

        return country_codes
    else:
        return f"Error: {response.status_code}"

# Fetch and display country codes with country names
country_codes = get_country_codes()

if isinstance(country_codes, list):
    for code, name in country_codes:
        print(f"{code}: {name}")
else:
    print(country_codes)
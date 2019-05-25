import json
from datetime import datetime

data = json.load(open('schedule.json'))

departure_station = input('departure station: ')
arrival_station = input('arrival station: ')
departure_time = input('departure time: ')

# Adds leading zero for 24-hour conversion
if len(departure_time.split(':')[0]) == 1:
    departure_time = '0' + departure_time

departure_time = datetime.strptime(departure_time, '%H:%M').strftime('%H:%M')

is_northbound = data['stations'].index(departure_station) < data['stations'].index(arrival_station)

optimal_route = None
next_best = None

for route in data['Northbound']:
    station_departure_time = data['Northbound'][route][departure_station]

    try:
        if len(station_departure_time.split(':')[0]) == 1:
            station_departure_time = '0' + station_departure_time

            station_departure_time = datetime.strptime(station_departure_time, '%H:%M').strftime('%H:%M')

            if station_departure_time < departure_time:
                optimal_route = route
            else:
                next_best = route
                break
    except:
        pass

print('Best:' + optimal_route)
print('Next best:' + next_best)

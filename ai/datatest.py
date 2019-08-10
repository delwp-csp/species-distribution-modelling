import geopandas as gpd
from shapely.geometry import Point
import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(10, 5))

built_up_area = gpd.read_file("../raw_dataset/VMLITE/VMLITE_BUILT_UP_AREA.shp")
# -37.821734, 144.970905 is a location within melbourne - should be built up
melbourne_location = Point([144.970905, -37.821734])


# -38.030268, 144.884119 is in the middle of the bay - not built up
bay_location = Point([144.884119, -38.030268])


# Convert the locations into geopanda objects
melbourne_location = gpd.GeoSeries(melbourne_location, 
                 crs="+init=epsg:4326").to_crs("+init=epsg:3111")


bay_location = gpd.GeoSeries(bay_location, 
                 crs="+init=epsg:4326").to_crs("+init=epsg:3111")

built_up_area.plot(ax=ax)

melbourne_location.plot(ax=ax, color="springgreen", marker="*",markersize=45)

bay_location.plot(ax=ax, color="red", marker="*", markersize=45)

plt.show()
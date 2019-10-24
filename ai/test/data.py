import pandas

points = [
    {
        "long": 145.0174712,
        "lat": -37.8352762,
        "vic_x": 2501537,
        "vic_y": 2407307,
        "built_up": True,
        "max_temp": 289.8289
    },
    {
        "long": 146.524658,
        "lat": -36.971838,
        "vic_x": 2635736,
        "vic_y": 2502037,
        "built_up": False,
        "max_temp": 299.2258
    }
]

def get_df(add_vicmap=False):
    df = pandas.DataFrame(columns=["latitude", "longitude"])
    for point in points:
        d = {"latitude": point["lat"], "longitude": point["long"]}
        if add_vicmap:
            d["vic_x"] = point["vic_x"]
            d["vic_y"] = point["vic_y"]

        df = df.append(d, ignore_index=True)

    return df

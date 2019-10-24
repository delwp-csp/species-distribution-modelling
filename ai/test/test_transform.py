import unittest
from lib.transform import latlong2vicmap, vicmap2latlong, add_vic_coordinates
from test.data import points, get_df

class TestTransform(unittest.TestCase):
    def test_to_vicmap(self):
        for point in points:
            self.assertEqual(
                (point["vic_x"], point["vic_y"]),
                latlong2vicmap([point["lat"], point["long"]])
            )
    def test_to_latlong(self):
        for point in points:
            expected = (point["lat"], point["long"])
            result = vicmap2latlong([point["vic_x"], point["vic_y"]])
            self.assertAlmostEqual(
                expected[0],
                result[0],
                places=4
            )
            self.assertAlmostEqual(
                expected[1],
                result[1],
                places=4
            )
    def test_add_coords(self):
        df = get_df()
        result = add_vic_coordinates(df)

        for (i, data) in result.iterrows():
            self.assertEqual(data["latitude"], points[i]["lat"])
            self.assertEqual(data["longitude"], points[i]["long"])
            self.assertEqual(data["vic_x"], points[i]["vic_x"])
            self.assertEqual(data["vic_y"], points[i]["vic_y"])
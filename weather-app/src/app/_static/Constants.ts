export class OpenWeatherApi {
    public static readonly Url: string = "http://api.openweathermap.org/data/2.5/weather?q=";
    public static readonly Key: string = "&appid=130e03d85d02be51d92d93646895340b";
    public static readonly XmlResponse: string = "&mode=xml";
    public static readonly CelciusUnits: string = "&units=metric";
    public static readonly UaCountryCode: string = ",UA";
}

export class OpenWeatherApiMarkup {
    public static readonly CityTag: string = "city";
    public static readonly WeatherTag: string = "weather";
    public static readonly TemperatureTag: string = "temperature";
    public static readonly NameAttribute: string = "name";
    public static readonly ValueAttribute: string = "value";
}

export class MarkupUnits {
    public static readonly Px: string = "px";
}

export class RegionTemperatureClass {
    public static readonly BoilingHot: string = "boiling-hot";
    public static readonly Hot: string = "hot";
    public static readonly Warm: string = "warm";
    public static readonly AboveZero: string = "above-zero";
    public static readonly Zero: string = "zero";
    public static readonly BelowZero: string = "below-zero";
    public static readonly Cold: string = "cold";
    public static readonly StrongFrost: string = "strong-frost";
    public static readonly FreezingCold: string = "freezing-cold";
    public static readonly FreezingToDeath: string = "freezing-to-death";
}
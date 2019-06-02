import { Component, OnInit } from "@angular/core";
import { WeatherService } from "../../services/weather.service";
import { Forecast } from "../../models/forecast.model";
import { City } from "../../models/city.model";
import { ukraineMainCities } from "../../mock-data/ukraine-main-cities";
import 
{ 
  OpenWeatherApiMarkup, 
  MarkupUnits, 
  RegionTemperatureClass 
} from "../../_static/Constants";

@Component({
  selector: "weather-map",
  templateUrl: "./weather-map.component.html",
  styleUrls: ["./weather-map.component.less"]
})
export class WeatherMapComponent implements OnInit {
  private _citiesMock: City[] = ukraineMainCities;
  private _forecastList: Forecast[] = [];

  constructor(private _weatherService: WeatherService) { 

  }

  get forecastList(): Forecast[] {
    return this._forecastList;
  }

  set forecastList(forecastList: Forecast[]) {
    this._forecastList = forecastList;
  }

  async ngOnInit() {
    this.forecastList = await this.getForecastList();
  }

  private applyCurrentRegionStyle(currentTemperature: number): string {
    let currentValue = Math.round(currentTemperature);
    
    if(currentValue > 30) {
      return RegionTemperatureClass.BoilingHot;
    }
    else if (currentValue > 25 && currentValue <= 30) {
      return RegionTemperatureClass.Hot;
    }
    else if (currentValue > 15 && currentValue <= 25) {
      return RegionTemperatureClass.Warm;
    }
    else if (currentValue > 0 && currentValue <= 15) {
      return RegionTemperatureClass.AboveZero;
    }
    else if (currentValue == 0) {
      return RegionTemperatureClass.Zero;
    }
    else if (currentValue > -5 && currentValue < 0) {
      return RegionTemperatureClass.BelowZero;
    }
    else if (currentValue > -10 && currentValue <= -5) {
      return RegionTemperatureClass.Cold;
    }
    else if (currentValue > -20 && currentValue <= -10) {
      return RegionTemperatureClass.StrongFrost;
    }
    else if (currentValue > -30 && currentValue <= -20) {
      return RegionTemperatureClass.FreezingCold;
    }
    else if (currentValue <= -30) {
      return RegionTemperatureClass.FreezingToDeath;
    }
    else {
      return "";
    }      
  }

  private async getForecastList(): Promise<Forecast[]> {
    const forecastList: Forecast[] = [];
    
    this._citiesMock.forEach(async item => {
      let forecast = await this._weatherService.getWeatherByCityAsync(item.Name);
      let forecastModel = new Forecast();
      forecastModel.City = forecast
                            .getElementsByTagName(OpenWeatherApiMarkup.CityTag)[0]
                            .getAttribute(OpenWeatherApiMarkup.NameAttribute);
      forecastModel.CurrentTemperature = forecast
                                          .getElementsByTagName(OpenWeatherApiMarkup.TemperatureTag)[0]
                                          .getAttribute(OpenWeatherApiMarkup.ValueAttribute);
      forecastModel.WeatherStatus = forecast
                              .getElementsByTagName(OpenWeatherApiMarkup.WeatherTag)[0]
                              .getAttribute(OpenWeatherApiMarkup.ValueAttribute);
      forecastModel.PositionX = item.PositionX + MarkupUnits.Px;
      forecastModel.PositionY = item.PositionY + MarkupUnits.Px;
      forecastModel.PathCoordinates = item.PathCoordinates;
      forecastModel.TemperaturePostitionX = item.TemperaturePostitionX + MarkupUnits.Px;
      forecastModel.TemperaturePostitionY = item.TemperaturePostitionY + MarkupUnits.Px;

      forecastList.push(forecastModel);
    });

    return forecastList;
  }
}

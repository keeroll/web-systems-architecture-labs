import { Component, OnInit } from "@angular/core";
import { WeatherService } from "../../services/weather.service";

import { Forecast } from "../../models/forecast.model";
import { City } from "../../models/city.model";

import { ukraineMainCities } from "../../mock-data/ukraine-main-cities";

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

  get ukraineCitiesList(): City[] {
    return this._citiesMock;
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

  private async getForecastList(): Promise<Forecast[]> {
    const forecastList: Forecast[] = [];

    this._citiesMock.forEach(async item => {
      let forecast = await this._weatherService.getWeatherByCityAsync(item.Name);
      let forecastModel = new Forecast();
      forecastModel.City = forecast.getElementsByTagName("city")[0].getAttribute("name") + "\n";
      forecastModel.CurrentTemperature = forecast.getElementsByTagName("temperature")[0].getAttribute("value");
      forecastModel.Clouds = forecast.getElementsByTagName("clouds")[0].getAttribute("name");
      forecastModel.PositionX = item.PositionX + "px";
      forecastModel.PositionY = item.PositionY + "px";

      forecastList.push(forecastModel);
    });

    return forecastList;
  }
}

import { Component, OnInit } from "@angular/core";
import { WeatherService } from "../../services/weather.service";
import { ForecastModel } from 'src/app/models/forecast.model';
import { ukraineMainCities } from "../../mock-data/ukraine-main-cities";

@Component({
  selector: "weather-map",
  templateUrl: "./weather-map.component.html",
  styleUrls: ["./weather-map.component.less"]
})
export class WeatherMapComponent implements OnInit {

  private _citiesMock: string[] = ukraineMainCities;
  private _forecastList: ForecastModel[] = [];

  constructor(private _weatherService: WeatherService) { 

  }

  get forecastList(): ForecastModel[] {
    return this._forecastList;
  }

  set forecastList(value: ForecastModel[]) {
    this._forecastList = value;
  }

  async ngOnInit() {
    this.forecastList = await this.getForecastList();
  }

  private async getForecastList(): Promise<ForecastModel[]> {
    const forecastList: ForecastModel[] = [];

    this._citiesMock.forEach(async item => {
      let forecast = await this._weatherService.getWeatherByCityAsync(item);
      let forecastModel = new ForecastModel();
      forecastModel.city = forecast.getElementsByTagName("city")[0].getAttribute("name");
      forecastModel.currentTemperature = forecast.getElementsByTagName("temperature")[0].getAttribute("value");
      forecastModel.clouds = forecast.getElementsByTagName("clouds")[0].getAttribute("name");
      //forecastModel.mapLabel = item.maplabel;

      forecastList.push(forecastModel);
    });

    return forecastList;
  }
}

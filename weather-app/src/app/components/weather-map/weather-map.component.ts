import { Component, OnInit } from "@angular/core";
import { WeatherService } from "../../services/weather.service";

@Component({
  selector: "weather-map",
  templateUrl: "./weather-map.component.html",
  styleUrls: ["./weather-map.component.less"]
})
export class WeatherMapComponent implements OnInit {

  constructor(private _weatherService: WeatherService) { 

  }

  async ngOnInit() {
    let forecast = await this._weatherService.getWeatherByCity("Kyiv");
    let city = forecast.getElementsByTagName("city")[0].getAttribute("name");
    let temp = forecast.getElementsByTagName("temperature")[0].getAttribute("value");
    let clouds = forecast.getElementsByTagName("clouds")[0].getAttribute("name");

    console.log(city + "   " + temp + "   " + clouds);
  }
}

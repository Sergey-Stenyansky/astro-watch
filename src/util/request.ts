import deployment from "@/deployment/deployment.json";

export default class RequestManager {
  static baseUrl = "";

  static setBaseUrl(value: string) {
    RequestManager.baseUrl = value;
  }
}

RequestManager.setBaseUrl(deployment.envConfigs[deployment.env as "development"].baseUrl);

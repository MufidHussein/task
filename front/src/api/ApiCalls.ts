import axios from "@@/app/utils/axios";
import Cookies from "js-cookie";
class ApiCalls {
  getHeaders = () => {
    return {
      Authorization: Cookies.get("token"),
      "Content-Type": "application/json",
    };
  };
  getConfig = () => {
    return {
      headers: this.getHeaders(),
    };
  };
  onError = (error: Error) => {
    console.log("An error occurred: ", error.message);
  };

  Error = this.onError.bind(this);

  callSignIn = (body: any, onData: any, onError: any = this.Error) => {
    axios
      .post("/sginin", body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(onData, onError);
  };
  findAllMenuItems = (onData: any, onError: any = this.Error) => {
    axios.get("/menuitem", this.getConfig()).then(onData, onError);
  };
  addMenuItem = (menuItem: any, onData: any, onError: any = this.Error) => {
    axios.post("/menuitem", menuItem, this.getConfig()).then(onData, onError);
  };
  findAllRestaurants = (onData: any, onError: any = this.Error) => {
    axios.get("/restaurant", this.getConfig()).then(onData, onError);
  };
  addRestaurant = (restaurant: any, onData: any, onError: any = this.Error) => {
    axios
      .post("/restaurant", restaurant, this.getConfig())
      .then(onData, onError);
  };
  addRestaurantMenuItems = (
    menuItems: any,
    onData: any,
    onError: any = this.Error
  ) => {
    axios
      .post("/restaurant/menu-item", menuItems, this.getConfig())
      .then(onData, onError);
  };
  findMaintenanceHistory = (onData: any, onError: any = this.Error) => {
    axios
      .get("/restaurant/maintenance-history", this.getConfig())
      .then(onData, onError);
  };
  addMaintenanceHistory = (
    maintenanceHistory: any,
    onData: any,
    onError: any = this.Error
  ) => {
    axios
      .post(
        "/restaurant/maintenance-history",
        maintenanceHistory,
        this.getConfig()
      )
      .then(onData, onError);
  };
}
export default new ApiCalls();

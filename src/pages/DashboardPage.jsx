import ListItem from "../components/ListItem";
import CloudinaryGallery from "../components/CloudinaryGallery";
import WeatherWidget from "../components/WeatherWidget";
const DashboardPage = () => {
  return (
    <div>
      <CloudinaryGallery />
      <WeatherWidget />
      <ListItem />
    </div>
  );
};

export default DashboardPage;

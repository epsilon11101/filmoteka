import "../css/utils/brand.css";
import "../components/root";
import { load, save } from "../scripts/local_save";

if (!load("watched") && !load("queue")) {
  save("watched", []);
  save("queue", []);
}

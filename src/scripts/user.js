import "../css/utils/brand.css";
import "../components/root_user";
import { save, load } from "../scripts/local_save";

if (!load("watched")) {
  save("watched", []);
  save("queue", []);
}

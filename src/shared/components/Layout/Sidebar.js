import { useState, useEffect } from "react";
import { getBanners } from "../../../services/Api";
import { getImageBanner } from "../../ultils";
const Sidebar = () => {
  const [banners, setBanners] = useState([]);
  useEffect(() => {
    getBanners({
      params: {
        limit: 7,
        sort: 1,
      },
    })
      .then(({ data }) => setBanners(data.data.docs))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div id="sidebar" className="col-lg-4 col-md-12 col-sm-12">
      <div id="banner">
        {banners?.map((item, index) => (
          <div key={index} className="banner-item">
            <a href="#">
              <img className="img-fluid" src={getImageBanner(item.image)} />
            </a>
          </div>
        ))}
      </div>

    </div>
  );
};
export default Sidebar;

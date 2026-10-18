import "../styles/GuiderDetailsCard.css"

export default function GuiderCard(props) {
  return (
        <div className="guide-card">
              <div className="guide-card__photo-wrap">
                <img className="guide-card__photo" src={props.img} />
              </div>
              <div className="guide-card__body">
                <p className="guide-card__location">{props.location}</p>
                <div className="guide-card__name-row">
                  <h3>{props.name}</h3>
                </div>
                <p className="guide-card__specialty">{props.speciality}</p>
                <p className="guide-card__description">{props.desciption}</p>
                <div className="guide-card__footer">
                  <strong>LKR {props.fee}<span> / day</span></strong>
                  <div className="guide-card__actions">
                    <button type="button" className="guide-button guide-button--primary">
                      Request guide
                    </button>
                  </div>
                </div>
              </div>
            </div>
  );
}

export default function Card() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 text-center mb-4">
            <br></br>
          <h3>กิจกรรมที่เกี่ยวข้อง</h3>
        </div>
      </div>

      <div className="row">
        {/* Card 1 */}
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <img
              src="/a10.jpg"
              className="card-img-top w-100"
              alt="..."
              style={{ height: "250px", objectFit: "cover" }}
            />
            <div className="card-body">
              <p className="card-text">
               This is an example of a longer description. It is used to test whether the card can expand to fit more content without clipping or hiding the text. The card body should grow as needed to display all text properly.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <img
              src="/a11.jpg"
              className="card-img-top w-100"
              alt="..."
              style={{ height: "250px", objectFit: "cover" }}
            />
            <div className="card-body">
              <p className="card-text">
                This is an example of a longer description. It is used to test whether the card can expand to fit more content without clipping or hiding the text. The card body should grow as needed to display all text properly.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <img
              src="/a12.jpg"
              className="card-img-top w-100"
              alt="..."
              style={{ height: "250px", objectFit: "cover" }}
            />
            <div className="card-body">
              <p className="card-text">
                Short description just to balance the layout. This card doesn't need to expand too much, but it will match the height of others due to Bootstrap's `h-100` utility.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

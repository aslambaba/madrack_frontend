import styles from "./styling.module.css";
import Image from "next/image";
import loginVector from "../../../public/loginVector.jpg";
import { Row, Col } from "react-bootstrap";

interface ObjectData {
  type: string;
  data: any;
  setId: any;
  fetchData: any;
}
const ObjectBar: React.FC<ObjectData> = ({ type, data, setId, fetchData }) => {
  return (
    <>
      <div className={styles.objectBarContainr}>
        <Row>
          <Col lg={2}>
            <Image
              className={styles.objectImage}
              alt="profile picture"
              src={loginVector}
              width={50}
              height={50}
            />
          </Col>
          <Col lg={3}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <p>{data.fullName}</p>
            </div>
          </Col>
          <Col lg={3}>
            <p>{type}</p>
          </Col>
          <Col lg={4}>
            {type == "request" ? (
              <>
                <button>View</button>
                <button>Approve</button>
                <button>Reject</button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setId(data.patient_id);
                    fetchData();
                  }}
                >
                  View
                </button>
                {/* <button>edit</button>
                <button>delete</button> */}
              </>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};
export default ObjectBar;

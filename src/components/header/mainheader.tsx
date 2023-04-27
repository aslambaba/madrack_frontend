import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './styling.module.css';
import Link from 'next/link';
export default function MainHeader(){
    return (
        <div className={styles.MainHeader}>
            <Row>
                <Col lg={6}>
                    <div className={styles.MainHeaderSec1}>
                        <Link style={{textDecoration: 'none'}} href='/'><h2>MadRack</h2></Link>
                    </div>
                </Col>
                <Col lg={6}>
                    <div className={styles.MainHeaderSec2}>
                        <Link href='/login'><button>Login</button></Link>
                        <Link href='/register'><button>Register</button></Link>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
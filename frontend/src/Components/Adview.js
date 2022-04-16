import React from 'react';
import { Container, Button, Col, Row, Card, Breadcrumb, Table, Image, Badge } from "react-bootstrap";
import logo from '../profile.png'
import 'bootstrap/dist/css/bootstrap.min.css';
function Adview(){
    const logoStyle={
        resizeMode: "cover",
        maxHeight: '8rem',
        maxWidth: '8rem'
    }
    return(
            <Container className="py-3">
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="#">Cook</Breadcrumb.Item>
                    <Breadcrumb.Item href="#">Goa</Breadcrumb.Item>
                    <Breadcrumb.Item active>Panaji</Breadcrumb.Item>
                </Breadcrumb>
                
                <Row className='py-5'>
                    <Col>
                        <h5>Cook needed in Panaji</h5>
                        
                        <Image styel={{resizeMode: "cover"}} src="https://picsum.photos/600/300"/>
                        <h5 >Description</h5>
                        <p>Need cook, supervisor,captain,waiter n supporting staffs for newly opening resturant..cook should be expert in completely odia authentic food preparation,both veg n nonveg</p>
                        
                        <Table className='py-3'>
                            <tr><th>Position type</th><td>Full-time</td></tr>
                            <tr><th>Salary period</th><td>Monthly</td></tr>
                            <tr><th>Salary from</th><td>7000</td></tr>
                            <tr><th>Salary to</th><td>17000</td></tr>
                        </Table>

                        <h5>Experience</h5>
                        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed odio eu dui pulvinar aliquam ut vel enim. Donec interdum aliquam justo, eu tempor ipsum porta sit amet. Etiam pharetra cursus facilisis. Donec facilisis sem id lacus malesuada, in blandit odio venenatis. Donec imperdiet arcu a ipsum ultrices ullamcorper.</p>
                    </Col>
                   
                    <Col >
                        <h5>Skills</h5>
                        <div className='py-3'>
                            <Badge pill bg="secondary">
                                North Indian
                            </Badge>{'  '}
                            <Badge pill bg="secondary">
                                Veg
                            </Badge>{'  '}
                            <Badge pill bg="secondary">
                                Non veg
                            </Badge>{'  '}
                            <Badge pill bg="secondary">
                                Waiter
                            </Badge>{'  '}
                            <Badge pill bg="secondary">
                                Supervisor
                            </Badge>
                        </div>
                        <h5>User description</h5>
                        <Card style={{ width: '25rem'}} className="my-3">
                            <Row>
                                <Col><Card.Img className='px-3 py-3'variant="top" src={logo} style={logoStyle} /></Col>
                                <Col>
                                <Card.Body>
                                    <Card.Title>Arun Kumar</Card.Title>
                                    <Card.Text>
                                    ★★★☆☆
                                    </Card.Text>
                                    <Button variant="primary" className="btn-sm">Chat</Button>
                                </Card.Body>
                                </Col>
                            </Row>
                        </Card>

                        <h5>Feedback</h5>
                        <Card style={{ width: '25rem'}}>
                            <Row>
                                <Col>
                                <Card.Body>
                                    <Card.Title>Arun Kumar</Card.Title>
                                    ★★★☆☆
                                    <Card.Text>
                                    Donec facilisis sem id lacus malesuada, in blandit odio venenatis. 
                                    </Card.Text>
                                </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                        <Card style={{ width: '25rem'}}>
                            <Row>
                                <Col>
                                <Card.Body>
                                    <Card.Title>Arun Kumar</Card.Title>
                                    ★★☆☆☆
                                    <Card.Text>
                                    Donec facilisis sem id lacus malesuada, in blandit odio venenatis. 
                                    </Card.Text>
                                </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                        <a href="/sellerpage" >View more</a>
                    </Col>
                </Row>

            </Container>

    );
}
export { Adview };


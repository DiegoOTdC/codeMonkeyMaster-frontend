import React, { useEffect } from "react"
import { Card, Button,Col, Container, Row } from "react-bootstrap"
import Form from "react-bootstrap/Form"
import { useSelector, useDispatch } from "react-redux"

import { getCompletedExercises, getUserWithStoredToken } from "../../store/user/actions"
import { selectCompletedExercises } from "../../store/user/selectors"
import CompletedExercises from "../../components/CompletedExercises"

export default function ProfilePage(){
    const dispatch = useDispatch()
    const exercises = useSelector(selectCompletedExercises)
    console.log("exercise test", exercises)

    useEffect(() => {
        if(exercises.length === 0){
            dispatch(getCompletedExercises())
        }
    }, [dispatch, exercises.length])

    return (
        <Container>
        <Row>
            <Col>
                <Card>
                    <Card.Img />
                    <Card.Body>
                        <Card.Title>
                            User,s Name
                        </Card.Title>
                        <Card.Text>
                            Form for user here
                        </Card.Text>
                        <CompletedExercises exerciseData={exercises} />
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Form>
                    <Form.Group
                        controlId="formImage">
                        {/* <Form.File
                            id="exampleFormControlFile1" /> */}
                    </Form.Group>

                    <Form.Group
                        controlId="formFullname">
                        <Form.Label>
                            Full Name:
                        </Form.Label>
                        <Form.Control
                            type="input"
                            placeholder="['Enter', 'Name']" />
                    </Form.Group>

                    <Form.Group
                        controlId="formEmail">
                        <Form.Label>
                            Email:
                        </Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="['example', '@gmail', '.com']" />
                    </Form.Group>

                </Form>
                <Button>
                    Update my info!
                </Button>
            </Col>
            </Row>
        </Container>
    )
}
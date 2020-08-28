import React, { useEffect, useState } from "react"
import { Card, Button,Col, Container, Row } from "react-bootstrap"
import Form from "react-bootstrap/Form"
import { useSelector, useDispatch } from "react-redux"

import { getCompletedExercises } from "../../store/user/actions"
import { selectCompletedExercises, selectUser } from "../../store/user/selectors"
import CompletedExercises from "../../components/CompletedExercises"

export default function ProfilePage(){
    const [name, set_Name] = useState("")
    const dispatch = useDispatch()
    const exercises = useSelector(selectCompletedExercises)
    console.log("exercise test", exercises)
    const user = useSelector(selectUser)

    useEffect(() => {
        if(exercises.length === 0){
            dispatch(getCompletedExercises())
        }
    }, [dispatch, exercises.length])

    return (
        <Container>
        <Row>
            <Col>
                <Card style={{
                    width: "25rem"
                }}>
                    <Card.Img 
                       variant="top"
                       src={user.image} />
                    <Card.Body>
                        <Card.Title>
                            {user.fullName}
                        </Card.Title>
                        <Card.Text>
                            <>
                                Ranking: {user.ranking}
                            </>
                            <br />
                            <>
                                Exp: {user.totalExp}
                            </>
                        </Card.Text>
                        <CompletedExercises exerciseData={exercises} />
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Form>
                    <Form.Group
                        controlId="formFullname">
                        <Form.Label>
                            Full Name:
                        </Form.Label>
                        <Form.Control
                            value={name}
                            onChange={(event) => set_Name(event.target.value)}
                            type="input"
                            placeholder="['Enter', 'Name']" />
                    </Form.Group>
                </Form>
                <Button onClick={() => {
                    // dispatch(updateUser(name))
                }}>
                    Update my info!
                </Button>
            </Col>
            </Row>
        </Container>
    )
}
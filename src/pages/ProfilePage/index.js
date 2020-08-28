import React from "react"
import { Card, Button, Form } from "react-bootstrap"

export default function ProfilePage(){
    return (
        <Card>
            <Card.Img />
            <Card.Body>
                <Card.Title>
                    User,s Name
                </Card.Title>
                <Card.Text>
                    Form for user here
                </Card.Text>
                <Form>
                <Form.Row>
                    <Form.Group
                        controlId="formGridImage"
                        as={Col}
                        md={2}>
                        <Form.Label>
                            Profile Picture:
                        </Form.Label>
                        <Form.File
                            id="imageFile"
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group
                        as={Col}
                        md={1}
                        controlId="formGridFullname">
                        <Form.Label>
                            Full Name:
                        </Form.Label>
                        <Form.Control
                            type="input"
                            placeholder="['Enter', 'Name']" />
                    </Form.Group>
                    <Form.Group
                        as={Col}
                        md={1}
                        controlId="formGridEmail">
                        <Form.Label>
                            Email:
                        </Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="['example', '@gmail', '.com']" />
                    </Form.Group>
                </Form.Row>
                </Form>
                <Button>
                    Update my info!
                </Button>
            </Card.Body>
        </Card>
    )
}
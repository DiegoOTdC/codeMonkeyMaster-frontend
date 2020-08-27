import React from "react"
import {ProgressBar, Container, Col, Row, Card} from "react-bootstrap"


const expProgress = [
    {
      rank: "Code Monkey",
      total: 30,
    },
    {
      rank: "Coder",
      total: 90,
    },
    {
      rank: "Developer",
      total: 180,
    },
    {
      rank: "Code Master",
      total: 360,
    },
  ]

export default function Progressbar(props){
    const user = props.userData
    console.log("got user data", user)

    const rankIcon = () => {
        if(user.ranking === "Code Monkey"){
            return (
                <span
                        role="img"
                        aria-label="monkeyFace">
                        🐵
                </span>
            )
        } else if(user.ranking === "Coder"){
            return (
                <span
                        role="img"
                        aria-label="coder">
                        👨‍💻
                </span>
            )
        } else if(user.ranking === "Code Wizard"){
            return (
                <span
                        role="img"
                        aria-label="codeWizard">
                        🧙
                </span>
            )
        } else {
            return (
                <span
                        role="img"
                        aria-label="Code Master">
                        🧞‍♂️
                </span>
            )
        }
    }

    function progress(){
        const progressNeeded = expProgress.find(exp => {
            console.log("user ranking", user.ranking)
            console.log("exp rank", exp.rank)
             return exp.rank === user.ranking
        })
        console.log("progress", progressNeeded)

        return (
            <ProgressBar
                variant="warning"
                now={(user.totalExp * 100) / progressNeeded.total}
                label={`${user.totalExp}/${progressNeeded.total}`} />
        )
    }

    return (
        <Container fluid>
          <Row>
            <Col>
              <Card style={{
                width: "12rem",
                backgroundColor: "transparent"
              }}>
                <Card.Body>
                  <Card.Title>
                    <h3 style={{
                      color: "yellow",
                      fontSize: 20,
                    }}>
                      {rankIcon()}
                    {user.ranking}</h3>
                  </Card.Title>
                  {progress()}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
    )
}
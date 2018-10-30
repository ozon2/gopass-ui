import * as React from 'react'
import * as m from 'react-materialize'
import SecretExplorer from './explorer/SecretExplorer'
import './application.css'

interface ApplicationState {
    secretName: string
    secretValue: string
}

export default class Application extends React.Component<any, ApplicationState> {
    constructor(props: any) {
        super(props)
        this.state = {
            secretName: '',
            secretValue: ''
        }
    }

    render() {
        const { secretValue, secretName } = this.state

        return (
            <div className="wrapper">
                <div className="secret-explorer">
                    <SecretExplorer onSecretClick={this.onSecretClick} />
                </div>

                <div className="main-content">
                    <m.Row>
                        <m.Col s={12}>
                            {secretName || secretValue ? (
                                <m.Card
                                    title={secretName}
                                    actions={[
                                        <a key="copy-clipboard" href="#">
                                            Copy to clipboard
                                        </a>
                                    ]}
                                >
                                    {secretValue}
                                </m.Card>
                            ) : (
                                <m.CardPanel>
                                    Please pick a secret from the navigation on the left.
                                </m.CardPanel>
                            )}
                        </m.Col>
                    </m.Row>
                </div>
            </div>
        )
    }

    onSecretClick = (secretName: string, secretValue: string) => {
        this.setState({ secretName, secretValue })
    }
}
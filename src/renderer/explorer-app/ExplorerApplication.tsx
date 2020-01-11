import * as React from 'react'

import SecretExplorer from './side-navigation/SecretExplorer'
import MainContent from './MainContent'

import './ExplorerApplication.css'
import { Tree } from '../components/tree/TreeComponent'
import Gopass from '../secrets/Gopass'
import SecretsFilterService from './side-navigation/SecretsFilterService'
import SecretsDirectoryService from './side-navigation/SecretsDirectoryService'

interface ExplorerApplicationState {
    tree: Tree
    secretNames: string[]
    searchValue: string
    selectedSecretName?: string
}

export default class ExplorerApplication extends React.Component<{}, ExplorerApplicationState> {
    constructor(props: any) {
        super(props)
        this.state = {
            tree: {
                name: 'Stores',
                toggled: true,
                children: [],
                path: ''
            },
            searchValue: '',
            selectedSecretName: undefined,
            secretNames: []
        }
    }

    public async componentDidMount() {
        const secretNames = await Gopass.getAllSecretNames()
        this.setState({ secretNames })
        await this.calculateAndSetTreeState(this.state.searchValue)
    }

    public render() {
        const { tree, searchValue, selectedSecretName } = this.state
        return (
            <>
                <SecretExplorer
                    selectedSecretName={selectedSecretName}
                    onSecretSelection={name => this.setState({ selectedSecretName: name })}
                    tree={tree}
                    searchValue={searchValue}
                    onSearchValueChange={async (newValue: string) => {
                        if (newValue !== searchValue) {
                            await this.calculateAndSetTreeState(newValue)
                        }
                        this.setState({ searchValue: newValue })
                    }}/>
                <MainContent onTreeUpdate={() => this.componentDidMount()}/>
            </>
        )
    }

    private async calculateAndSetTreeState(searchValue: string) {
        const { secretNames, selectedSecretName } = this.state

        const filteredSecretNames = SecretsFilterService.filterBySearch(secretNames, searchValue)
        const tree: Tree = SecretsDirectoryService.secretPathsToTree(filteredSecretNames, selectedSecretName)
        this.setState({ ...this.state, tree })
    }
}

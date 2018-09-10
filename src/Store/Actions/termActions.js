import constants from './constants'

const actions = {

    //term actions
    setTerms:(terms) => {
        return {type: constants.SET_TERMS, terms}
    },
    chooseTerm:(term, termChosen) => {
        return {type: constants.CHOOSE_TERM, term, termChosen}
    }
}

export default actions
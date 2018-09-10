import constants from './constants'

const actions = {

    //term actions
    setTerms:(terms) => {
        return {type: constants.SET_TERMS, terms}
    },
    chooseTerm:(term) => {
        return {type: constants.CHOOSE_TERM, term}
    }
}

export default actions
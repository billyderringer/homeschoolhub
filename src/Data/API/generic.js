import { apiURL } from '../data'
import axios from 'axios'

class GenericApi{

    addElement(body, element, parentId, cb){
        axios({
            url: `${apiURL}/${element}/create/${parentId}`,
            method: "POST",
            headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
            data: body
        })
            .then(res => {
                cb(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    getElements(parentRoute, route, cb){
        axios({
            url: `${apiURL}/${parentRoute}/${route}/${localStorage.getItem(route + 'Id')}`,
            method: "GET",
            headers: {"Authorization": "Bearer " + localStorage.getItem('token')}
        })
            .then(res => {
                cb(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    getElement(route, cb){
        axios({
            url: `${apiURL}/${route}/${localStorage.getItem(route + 'Id')}`,
            method: "GET",
            headers: {"Authorization": "Bearer " + localStorage.getItem('token')}
        })
            .then(res => {
                cb(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    updateElement(body, route, elementId, cb){
        axios({
            url: `${apiURL}/${route}/update/${elementId}`,
            method: "PATCH",
            headers: {"Authorization": "Bearer " + localStorage.getItem('token')},
            data: body
        })
            .then(res => {
                cb(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    deleteElement(route, elementId, cb){
        axios({
            url: `${apiURL}/${route}/remove/${elementId}`,
            method: "DELETE",
            headers: {"Authorization": "Bearer " + localStorage.getItem('token')}
        })
            .then(res => {
                cb(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

}

export default GenericApi
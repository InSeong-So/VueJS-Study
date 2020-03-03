// DOM function
const one = ele => document.querySelector(ele)
const all = ele => document.querySelectorAll(ele)
const create = (name, attr) => {
    const ele = document.createElement(name)
    for (const k in attr) {
        const v = attr[k]
        switch (k) {
            case 'html':
                ele.innerHTML = v;
                break;
            case 'event':
                for (const e in v) ele.addEventListener(e, v[e]);
                break;
            default:
                ele.setAttribute(k, v);
                break
        }
    }
    return ele
}

// myAjax
class Ajax {
    static async get(url) {
        const json = await fetch(url).then(res => res.json())
        if (!json.success) throw json.err
        return json.data
    }

    static async set(url, data, method = 'post') {
        const headers = {'Content-Type': 'application/json'}
        const params = {method, headers, body: JSON.stringify(data)}
        const json = await fetch(url, params).then(res => res.json())
        if (!json.success) throw json.err
        return json.data
    }
}

// DataBase
class Model {
    async getTodos() {
        return await Ajax.get('/api/todos')
    }

    async setTodos(todos) {
        await Ajax.set('/api/todos', {todos})
    }

    async getDetail(idx) {
        return await Ajax.get('/api/detail/' + idx) || []
    }

    async addDetail(detail, idx) {
        await Ajax.set('/api/detail/' + idx, {detail})
    }

    async setDetail(detail, idx) {
        await Ajax.set('/api/detail/' + idx, {detail}, 'put')
    }
}

// Renderer
class Renderer {
    constructor(model) {
        this.model = model
        this.todosInput = one('.todos-input')
        this.todosList = one('.todos-list')
        this.detailList = one('.detail-list')
        this.todosInput.onkeyup = this.addTodos()
    }

    addTodos() {
        const $this = this
        return async function (e) {
            if (e.keyCode === 13) {
                const todos = await $this.model.getTodos()
                todos.push({name: e.target.value})
                await $this.model.setTodos(todos)
                $this.todosRender(todos)
                e.target.value = ''
                e.target.focus
            }
        }
    }

    addDetail(todosEvent, idx) {
        const $this = this
        return async inputEvent => {
            if (inputEvent.keyCode === 13) {
                await $this.model.addDetail({name: inputEvent.target.value, state: false}, idx)
                todosEvent.target.click()
            }
        }
    }

    setDetail(v) {
        const $this = this
        return async e => {
            v.state = !v.state
            await $this.model.setDetail(v, v.idx)
            e.target.style.color = v.state ? '#09F' : ''
        }
    }

    todosRender(todos) {
        const ul = create('ul', {
            class: 'list-group'
        })
        todos.forEach((v, k) => {
            ul.appendChild(create('li', {
                html: v.name,
                class: 'list-group-item',
                event: {click: this.detailRender(v.name, k)}
            }))

        })
        this.todosList.innerHTML = ''
        this.todosList.appendChild(ul)
    }

    detailRender(todosName, idx) {
        const $this = this
        return async e => {
            const title = create('p', {class:'lead', html: todosName})
            const ul = create('ul', {class:'list-group'})
            const detail = await $this.model.getDetail(idx)
            const input = create('input', {
                type:'text',
                class: 'detail-input form-control',
                placeholder: 'detail 입력',
                style: 'margin-top:20px;',
                event: {keyup: $this.addDetail(e, idx)}
            })
            const close = create('button', {
                type: 'button',
                class:'btn btn-primary',
                html: '닫기',
                style: 'margin-top:50px;',
                event: {click: e => $this.detailList.innerHTML = ''}
            })
            detail.forEach(v => ul.appendChild($this.detailChildRender(v)))
            $this.detailList.innerHTML = ''

            for (const ele of [title, input, ul, close]) $this.detailList.appendChild(ele)
        }
    }

    detailChildRender(v) {
        const $this = this
        return create('li', {
            class:'list-group-item',
            html: v.name,
            style: v.state ? 'background-color:#09F' : ''
            // event: {click: $this.setDetail(v)}
        })
    }
}

window.onload = async _ => {
    const model = new Model()
    const renderer = new Renderer(model)
    const todos = await model.getTodos()
    renderer.todosRender(todos)
}
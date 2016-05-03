/**
 * Created by daniel on 16/5/4.
 */

function Return({code=1, data={}, message=""} = {}) {
    return {
        code: code,
        data: data,
        message: message
    }
}

function Success(data = {}) {
    return Return({code: 1, data: data});
}

function Fail(data = "") {
    return Return({code: -1, message: data});
}

export {Return, Success, Fail}
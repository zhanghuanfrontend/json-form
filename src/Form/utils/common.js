// 深拷贝
export const cloneData = (data) => {
    if(Array.isArray(data)){
        return data.map(item => cloneData(item))
    }else if(data instanceof Object){
        const keys = Object.keys(data)
        const newData = {}
        keys.forEach(key => {
            newData[key] = cloneData(data[key])
        })
        return newData
    }else{
        return data
    }
}
// 获取assistData的key
export const getAssistDataKey = (keyList) => {
    if(!keyList || !Array.isArray(keyList) || keyList.length === 0 || !keyList.includes('assistData')){
        return []
    }
    const index = keyList.indexOf('assistData')
    return keyList.filter((item, idx) => idx > index)
}
// 获取dataWrap
export const getDataWrap = (data, keyList) => {
    if(data && Array.isArray(keyList)){
        if(keyList.length === 0){
            return {
                dataWrap: data,
                lastKey: ''
            }
        }else if(keyList.length === 1){
            return {
                dataWrap: data,
                lastKey: keyList[0]
            }
        }else {
            let preKey = keyList[0], dataWrap = data, lastKey = keyList[keyList.length - 1]
            for(let i = 1; i < keyList.length; i++){
                dataWrap = (dataWrap && dataWrap[preKey]) || {}
                let curKey = keyList[i]
                if(dataWrap && dataWrap[curKey] && dataWrap[curKey] instanceof Object){
                    preKey = curKey
                }else {
                    break
                }
            }
            return {
                dataWrap,
                lastKey,
            }
        }
    }else {
        return {
            dataWrap: data,
            lastKey: keyList
        }
    }
}

// 获取lastkey及其值
export const getLastKeyValue = (data, keyList) => {
    if(!data || !data instanceof Object || !keyList || !Array.isArray(keyList) || keyList.length === 0){
        return {
            lastData: data,
            lastKey: keyList,
        }
    }
    let lastData = data, lastKey = keyList[0]
    keyList.forEach(key => {
        lastData = lastData && lastData[key]
        lastKey = key
    })
    return {
        lastData,
        lastKey,
    }
}

// 处理keyList
export const handleKeyList = (key) => {
    if(!key){
        return key
    }
    if(Array.isArray(key)){
        if(key.some(item => item instanceof Object && item.key && typeof item.value !== 'undefined')){
            const newKey = []
            key.forEach(child => {
                if(child.key){
                    newKey.push({
                        key: child.key.includes('.') ? child.key.split('.') : [child.key],
                        value: child.value
                    })
                }
            })
            return newKey
        }else {
            return key
        }
    }else{
        if(key.includes('.')){
            return key.split('.')
        }else{
            return [key]
        }
    }
}
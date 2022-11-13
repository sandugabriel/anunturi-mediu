const zip = (...iterables) => {
    let iterators = iterables.map(i => i[Symbol.iterator]() )
    // eslint-disable-next-line no-constant-condition
    while (true) {
        let results = iterators.map(iter => iter.next() )
        if (results.some(res => res.done) ) return
        else return results.map(res => res.value )
    }
}

export default zip;
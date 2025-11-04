import React from 'react'

type Props = {
    top?: number,
    right?: number,
    bottom?: number,
    left?: number
}

const _Separator = (props: Props) => {
    const {
        top,
        right,
        bottom,
        left
    } = props;

    return (
        <div style={{ marginTop: top, marginLeft: left, marginRight: right, marginBottom: bottom }}></div>
    )
}

export default _Separator;

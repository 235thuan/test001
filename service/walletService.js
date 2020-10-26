let functionWallet = require('../DB/function')


exports.createWallet = async function (address) {
    try {
        await functionWallet.wallet.create({
            address: address,
        })
    } catch (err) {
        console.log(err);
    }
}


exports.updateWallet = async function (getId, content, pushId, type, title) {
    let list = await functionWallet.wallet.get({}, "userId");
    try {
        if (getId === "sendAll") {
            for (let i = 0; i < list.length; i++) {
                await functionWallet.wallet.set(
                    {userId: list[i].userId},
                    {
                        $push: {
                            push: {
                                content: content,
                                pushId: pushId,
                                type: type,
                                title: title,
                            }
                        }
                    }
                );
            }
        } else {
            await functionWallet.wallet.set(
                {userId: getId},
                {
                    $push: {
                        push: {
                            content: content,
                            pushId: pushId,
                            type: type,
                            title: title,
                        }
                    }
                }
            )
        }
    } catch (err) {
        console.log(err);
        emitter.emit(eventConfig.GETNOTIFICATION);
    }
}
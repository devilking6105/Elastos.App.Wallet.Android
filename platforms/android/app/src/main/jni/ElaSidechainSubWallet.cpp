// Copyright (c) 2012-2018 The Elastos Open Source Project
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

#include "ElaUtils.h"
#include "Elastos.Wallet.h"


//"(JLjava/lang/String;Ljava/lang/String;JLjava/lang/String;Ljava/lang/String;Ljava/lang/String;JLjava/lang/String;)Ljava/lang/String;"
static jstring JNICALL nativeCreateWithdrawTransaction(JNIEnv *env, jobject clazz, jlong jSideSubWalletProxy, jstring jfromAddress
        , jstring jtoAddress, jlong amount, jstring jmainchainAccounts, jstring jmainchainAmounts,
        jstring jmainchainIndexs, jlong fee, jstring jmemo, jstring jremark)
{
    LOGD("FUNC=[%s]=========================line=[%d]", __FUNCTION__, __LINE__);
    const char* fromAddress = env->GetStringUTFChars(jfromAddress, NULL);
    const char* toAddress = env->GetStringUTFChars(jtoAddress, NULL);
    const char* mainchainAccounts = env->GetStringUTFChars(jmainchainAccounts, NULL);
    const char* mainchainAmounts = env->GetStringUTFChars(jmainchainAmounts, NULL);
    const char* mainchainIndexs = env->GetStringUTFChars(jmainchainIndexs, NULL);
    const char* memo = env->GetStringUTFChars(jmemo, NULL);
    const char* remark = env->GetStringUTFChars(jremark, NULL);

    LOGD("FUNC=[%s]=========================line=[%d], fromAddress=[%s]", __FUNCTION__, __LINE__, fromAddress);
    LOGD("FUNC=[%s]=========================line=[%d], toAddress=[%s]", __FUNCTION__, __LINE__, toAddress);
    LOGD("FUNC=[%s]=========================line=[%d], mainchainAccounts=[%s]", __FUNCTION__, __LINE__, mainchainAccounts);
    LOGD("FUNC=[%s]=========================line=[%d], mainchainAmounts=[%s]", __FUNCTION__, __LINE__, mainchainAmounts);
    LOGD("FUNC=[%s]=========================line=[%d], mainchainIndexs=[%s]", __FUNCTION__, __LINE__, mainchainIndexs);
    LOGD("FUNC=[%s]=========================line=[%d], memo=[%s]", __FUNCTION__, __LINE__, memo);
    LOGD("FUNC=[%s]=========================line=[%d], remark=[%s]", __FUNCTION__, __LINE__, remark);

    ISubWallet* base = (ISubWallet*)jSideSubWalletProxy;
    ISidechainSubWallet* wallet = ISidechainSubWallet::Probe((ISubWallet*)jSideSubWalletProxy);
    // ISidechainSubWallet* wallet = (ISidechainSubWallet*)jSideSubWalletProxy;
    String result;


{
    // String id;
    // base->GetChainId(&id);
    // LOGD("FUNC=[%s]=========================line=[%d], base=[%p], idptr=[%p], wallet=[%p], id=[%s]"
    //     , __FUNCTION__, __LINE__, base, IIdChainSubWallet::Probe(base), ISidechainSubWallet::Probe(base), id.string());
}


    try {
        LOGD("FUNC=[%s]=========================line=[%d]", __FUNCTION__, __LINE__);
        wallet->CreateWithdrawTransaction(String(fromAddress), String(toAddress), amount
                , String(mainchainAccounts), String(mainchainAmounts)
                , String(mainchainIndexs), fee, String(memo), String(remark), &result);

        LOGD("FUNC=[%s]=========================line=[%d]", __FUNCTION__, __LINE__);
        return env->NewStringUTF(result.string());
        LOGD("FUNC=[%s]=========================line=[%d]", __FUNCTION__, __LINE__);
    }
    catch (std::invalid_argument& e) {
        ThrowWalletException(env, e.what());
    }
    catch (std::logic_error& e) {
        ThrowWalletException(env, e.what());
    }
    catch (std::runtime_error& e) {
        ThrowWalletException(env, e.what());
    }
    catch (std::exception& e) {
        ThrowWalletException(env, e.what());
    }

    env->ReleaseStringUTFChars(jfromAddress, fromAddress);
    env->ReleaseStringUTFChars(jtoAddress, toAddress);
    env->ReleaseStringUTFChars(jmainchainAccounts, mainchainAccounts);
    env->ReleaseStringUTFChars(jmainchainAmounts, mainchainAmounts);
    env->ReleaseStringUTFChars(jmainchainIndexs, mainchainIndexs);
    env->ReleaseStringUTFChars(jmemo, memo);
    env->ReleaseStringUTFChars(jremark, remark);
    LOGD("FUNC=[%s]=========================line=[%d]", __FUNCTION__, __LINE__);
    return NULL;
}

//"(J)Ljava/lang/String;"
static jstring JNICALL nativeGetGenesisAddress(JNIEnv *env, jobject clazz, jlong jSideSubWalletProxy)
{
    ISidechainSubWallet* wallet = (ISidechainSubWallet*)jSideSubWalletProxy;
    String address;

    try {
        wallet->GetGenesisAddress(&address);
    }
    catch (std::invalid_argument& e) {
        ThrowWalletException(env, e.what());
    }
    catch (std::logic_error& e) {
        ThrowWalletException(env, e.what());
    }
    catch (std::runtime_error& e) {
        ThrowWalletException(env, e.what());
    }
    catch (std::exception& e) {
        ThrowWalletException(env, e.what());
    }

    return env->NewStringUTF(address.string());
}


static const JNINativeMethod gMethods[] = {
    {"nativeCreateWithdrawTransaction",
    "(JLjava/lang/String;Ljava/lang/String;JLjava/lang/String;Ljava/lang/String;Ljava/lang/String;JLjava/lang/String;Ljava/lang/String;)Ljava/lang/String;"
            , (void*)nativeCreateWithdrawTransaction},
    {"nativeGetGenesisAddress", "(J)Ljava/lang/String;", (void*)nativeGetGenesisAddress},
};

jint register_elastos_spv_ISidechainSubWallet(JNIEnv *env)
{
    return jniRegisterNativeMethods(env, "com/elastos/spvcore/ISidechainSubWallet",
        gMethods, NELEM(gMethods));
}

// Copyright (c) 2012-2018 The Elastos Open Source Project
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

#include "ElaUtils.h"
#include "Elastos.Wallet.h"


//"(J)Ljava/lang/String;"
static jstring JNICALL nativeGetId(JNIEnv *env, jobject clazz, jlong jMasterProxy)
{
    IMasterWallet* masterWallet = (IMasterWallet*)jMasterProxy;
    String key;
    masterWallet->GetId(&key);
    return env->NewStringUTF(key.string());
}

//"(J)[J"
static jlongArray JNICALL nativeGetAllSubWallets(JNIEnv *env, jobject clazz, jlong jMasterProxy)
{
    IMasterWallet* masterWallet = (IMasterWallet*)jMasterProxy;
    AutoPtr<ArrayOf<ISubWallet*> > array;
    masterWallet->GetAllSubWallets((ArrayOf<ISubWallet*>**)&array);

    const int length = array->GetLength();
    jlong* proxies = new jlong[length];
    for (int i = 0; i < length; ++i) {
        AutoPtr<ISubWallet> subWallet = (*array)[i];
        proxies[i] = (jlong)subWallet.Get();
        subWallet->AddRef();
    }

    jlongArray jarray = env->NewLongArray(length);
    env->SetLongArrayRegion(jarray, 0, length, proxies);
    delete[] proxies;
    return jarray;
}

//"(JLjava/lang/String;Ljava/lang/String;ZJ)J"
static jlong JNICALL nativeCreateSubWallet(JNIEnv *env, jobject clazz, jlong jMasterProxy, jstring jChainID,
        jstring jpayPassword, jboolean jSingleAddress, jlong jFeePerKb)
{
    const char* chainID = env->GetStringUTFChars(jChainID, NULL);
    const char* payPassword = env->GetStringUTFChars(jpayPassword, NULL);

    IMasterWallet* masterWallet = (IMasterWallet*)jMasterProxy;
    AutoPtr<ISubWallet> subWallet;
    masterWallet->CreateSubWallet(String(chainID), String(payPassword), jSingleAddress, jFeePerKb, (ISubWallet**)&subWallet);
    subWallet->AddRef();

    env->ReleaseStringUTFChars(jChainID, chainID);
    env->ReleaseStringUTFChars(jpayPassword, payPassword);
    return (jlong)subWallet.Get();
}

//"(JLjava/lang/String;Ljava/lang/String;ZIJ)J"
static jlong JNICALL nativeRecoverSubWallet(JNIEnv *env, jobject clazz, jlong jMasterProxy, jstring jChainID,
        jstring jpayPassword, jboolean jSingleAddress, jint limitGap, jlong jFeePerKb)
{
    const char* chainID = env->GetStringUTFChars(jChainID, NULL);
    const char* payPassword = env->GetStringUTFChars(jpayPassword, NULL);

    IMasterWallet* masterWallet = (IMasterWallet*)jMasterProxy;
    AutoPtr<ISubWallet> subWallet;
    masterWallet->RecoverSubWallet(String(chainID), String(payPassword), jSingleAddress,
                                   limitGap, jFeePerKb, (ISubWallet**)&subWallet);
    subWallet->AddRef();

    env->ReleaseStringUTFChars(jChainID, chainID);
    env->ReleaseStringUTFChars(jpayPassword, payPassword);
    return (jlong)subWallet.Get();
}

//"(JJ)V"
static void JNICALL nativeDestroyWallet(JNIEnv *env, jobject clazz, jlong jMasterProxy, jlong jsubWalletProxy)
{
    IMasterWallet* masterWallet = (IMasterWallet*)jMasterProxy;
    ISubWallet* subWallet = (ISubWallet*)jsubWalletProxy;
    masterWallet->DestroyWallet(subWallet);
}

//"(J)Ljava/lang/String;"
static jstring JNICALL nativeGetPublicKey(JNIEnv *env, jobject clazz, jlong jMasterProxy)
{
    IMasterWallet* masterWallet = (IMasterWallet*)jMasterProxy;
    String key;
    masterWallet->GetPublicKey(&key);
    return env->NewStringUTF(key.string());
}

//"(JLjava/lang/String;Ljava/lang/String;)Ljava/lang/String;"
static jstring JNICALL nativeSign(JNIEnv *env, jobject clazz, jlong jMasterProxy, jstring jmessage, jstring jpayPassword)
{
    const char* message = env->GetStringUTFChars(jmessage, NULL);
    const char* payPassword = env->GetStringUTFChars(jpayPassword, NULL);

    IMasterWallet* masterWallet = (IMasterWallet*)jMasterProxy;
    String result;
    masterWallet->Sign(String(message), String(payPassword), &result);

    env->ReleaseStringUTFChars(jmessage, message);
    env->ReleaseStringUTFChars(jpayPassword, payPassword);
    return env->NewStringUTF(result.string());
}

//"(JLjava/lang/String;Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;"
static /*nlohmann::json*/jstring JNICALL nativeCheckSign(JNIEnv *env, jobject clazz, jlong jMasterProxy, jstring jaddress, jstring jmessage,
        jstring jsignature)
{
    const char* address = env->GetStringUTFChars(jaddress, NULL);
    const char* message = env->GetStringUTFChars(jmessage, NULL);
    const char* signature = env->GetStringUTFChars(jsignature, NULL);

    IMasterWallet* masterWallet = (IMasterWallet*)jMasterProxy;
    String jsonVal;
    masterWallet->CheckSign(String(address), String(message), String(signature), &jsonVal);

    env->ReleaseStringUTFChars(jaddress, address);
    env->ReleaseStringUTFChars(jmessage, message);
    env->ReleaseStringUTFChars(jsignature, signature);

    return env->NewStringUTF(jsonVal.string());
}

//"(JLjava/lang/String;)Z"
static jboolean JNICALL nativeIsAddressValid(JNIEnv *env, jobject clazz, jlong jMasterProxy, jstring jaddress)
{
    const char* address = env->GetStringUTFChars(jaddress, NULL);

    IMasterWallet* masterWallet = (IMasterWallet*)jMasterProxy;
    Boolean valid = FALSE;
    masterWallet->IsAddressValid(String(address), &valid);

    env->ReleaseStringUTFChars(jaddress, address);

    return (jboolean)valid;
}

//"(J)Ljava/lang/String;"
static jstring JNICALL nativeGenerateMnemonic(JNIEnv *env, jobject clazz, jlong jMasterProxy)
{
    IMasterWallet* masterWallet = (IMasterWallet*)jMasterProxy;
    String mnemonic;
    masterWallet->GenerateMnemonic(&mnemonic);
    return env->NewStringUTF(mnemonic.string());
}

//"(J)[Ljava/lang/String;"
static jobjectArray JNICALL nativeGetSupportedChains(JNIEnv *env, jobject clazz, jlong jMasterProxy)
{
    IMasterWallet* masterWallet = (IMasterWallet*)jMasterProxy;
    AutoPtr<ArrayOf<String> > chains;
    masterWallet->GetSupportedChains((ArrayOf<String>**)&chains);

    const int length = chains->GetLength();
    if (length < 1) {
        return NULL;
    }

    jclass objClass = env->FindClass("java/lang/String");
    jobjectArray objArray = env->NewObjectArray(length, objClass, 0);
    for (int i = 0; i < length; ++i) {
        env->SetObjectArrayElement(objArray, i, env->NewStringUTF((*chains)[i].string()));
    }

    return objArray;
}

//"(JLjava/lang/String;Ljava/lang/String;)V"
static void JNICALL nativeChangePassword(JNIEnv *env, jobject clazz, jlong jMasterProxy, jstring joldPassword, jstring jnewPassword)
{
    const char* oldPassword = env->GetStringUTFChars(joldPassword, NULL);
    const char* newPassword = env->GetStringUTFChars(jnewPassword, NULL);

    IMasterWallet* masterWallet = (IMasterWallet*)jMasterProxy;
    masterWallet->ChangePassword(String(oldPassword), String(newPassword));

    env->ReleaseStringUTFChars(joldPassword, oldPassword);
    env->ReleaseStringUTFChars(jnewPassword, newPassword);
}

static void JNICALL nativeResetAddressCache(JNIEnv *env, jobject clazz, jlong jMasterProxy, jstring jpayPassword)
{
    const char* payPassword = env->GetStringUTFChars(jpayPassword, NULL);

    IMasterWallet* masterWallet = (IMasterWallet*)jMasterProxy;
    masterWallet->ResetAddressCache(String(payPassword));

    env->ReleaseStringUTFChars(jpayPassword, payPassword);
}

static const JNINativeMethod gMethods[] = {
    {"nativeGetId", "(J)Ljava/lang/String;", (void*)nativeGetId},
    {"nativeGetAllSubWallets", "(J)[J", (void*)nativeGetAllSubWallets},
    {"nativeCreateSubWallet","(JLjava/lang/String;Ljava/lang/String;ZJ)J", (void*)nativeCreateSubWallet},
    {"nativeRecoverSubWallet", "(JLjava/lang/String;Ljava/lang/String;ZIJ)J", (void*)nativeRecoverSubWallet},
    {"nativeDestroyWallet", "(JJ)V", (void*)nativeDestroyWallet},
    {"nativeGetPublicKey", "(J)Ljava/lang/String;", (void*)nativeGetPublicKey},
    {"nativeSign", "(JLjava/lang/String;Ljava/lang/String;)Ljava/lang/String;", (void*)nativeSign},
    {"nativeCheckSign", "(JLjava/lang/String;Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;", (void*)nativeCheckSign},
    {"nativeIsAddressValid", "(JLjava/lang/String;)Z", (void*)nativeIsAddressValid},
    {"nativeGenerateMnemonic", "(J)Ljava/lang/String;", (void*)nativeGenerateMnemonic},
    {"nativeGetSupportedChains", "(J)[Ljava/lang/String;", (void*)nativeGetSupportedChains},
    {"nativeResetAddressCache", "(JLjava/lang/String;)V", (void*)nativeResetAddressCache},
};

jint register_elastos_spv_IMasterWallet(JNIEnv *env)
{
    return jniRegisterNativeMethods(env, "com/elastos/spvcore/IMasterWallet",
        gMethods, NELEM(gMethods));
}

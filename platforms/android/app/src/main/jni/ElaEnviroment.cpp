// Copyright (c) 2012-2018 The Elastos Open Source Project
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

#include "ElaUtils.h"
#include "Elastos.Wallet.h"

static AutoPtr<IWalletEnviroment> sElastosWalletEnviroment = NULL;

//"(Ljava/lang/String;)V"
static void JNICALL nativeInitializeRootPath(JNIEnv *env, jobject clazz, jstring jRootPath)
{
    const char* rootPath = env->GetStringUTFChars(jRootPath, NULL);
    sElastosWalletEnviroment->InitializeRootPath(String(rootPath));
    env->ReleaseStringUTFChars(jRootPath, rootPath);
}

//"()J"
static jlong JNICALL nativeGetMasterWalletManager(JNIEnv *env, jobject clazz)
{
    AutoPtr<IMasterWalletManager> masterMgr;
    sElastosWalletEnviroment->GetMasterWalletManager((IMasterWalletManager**)&masterMgr);
    LOGD("Func=[%s]=Line=[%d]====================masterMgr=[%p]", __FUNCTION__, __LINE__, masterMgr.Get());
    return (jlong)masterMgr.Get();
}

//"()Ljava/lang/String;"
static jstring JNICALL nativeGetRootPath(JNIEnv *env, jobject clazz)
{
    String rootPath;
    sElastosWalletEnviroment->GetRootPath(&rootPath);
    return env->NewStringUTF(rootPath.string());
}

//"()Ljava/lang/String;"
static void JNICALL nativeSaveConfigs(JNIEnv *env, jobject clazz)
{
    sElastosWalletEnviroment->SaveConfigs();
}

static const JNINativeMethod gMethods[] = {
        {"nativeInitializeRootPath", "(Ljava/lang/String;)V", (void*)nativeInitializeRootPath},
        {"nativeGetMasterWalletManager", "()J", (void*)nativeGetMasterWalletManager},
        {"nativeGetRootPath", "()Ljava/lang/String;", (void*)nativeGetRootPath},
        {"nativeSaveConfigs", "()V", (void*)nativeSaveConfigs},
};

jint register_elastos_spv_Enviroment(JNIEnv *env)
{
    CWalletEnviroment::AcquireSingleton((IWalletEnviroment**)&sElastosWalletEnviroment);
    return jniRegisterNativeMethods(env, "com/elastos/spvcore/Enviroment",
                                    gMethods, NELEM(gMethods));
}

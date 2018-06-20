// Copyright (c) 2012-2018 The Elastos Open Source Project
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

#include "ElaUtils.h"
#include "Elastos.Wallet.h"

#define  CLASS_MASTERWALLET   "com/elastos/spvcore/IMasterWallet"
#define  FIELD_MASTERWALLET   "mMasterProxy"


static void JNICALL nativeDisposeNative(JNIEnv *env, jobject clazz, jlong jWalletMgr)
{
    IMasterWalletManager* walletManager = (IMasterWalletManager*)jWalletMgr;
    walletManager->Release();
}

//"(JLjava/lang/String;Ljava/lang/String;)J"
static jlong JNICALL nativeCreateMasterWallet(JNIEnv *env, jobject clazz, jlong jWalletMgr, jstring jmasterWalletId, jstring jlanguage)
{
    const char* masterWalletId = env->GetStringUTFChars(jmasterWalletId, NULL);
    const char* language = env->GetStringUTFChars(jlanguage, NULL);

    IMasterWalletManager* walletManager = (IMasterWalletManager*)jWalletMgr;
    AutoPtr<IMasterWallet> masterWallet;
    walletManager->CreateMasterWallet(String(masterWalletId), String(language), (IMasterWallet**)&masterWallet);
    masterWallet->AddRef();

    env->ReleaseStringUTFChars(jmasterWalletId, masterWalletId);
    env->ReleaseStringUTFChars(jlanguage, language);
    return (jlong)masterWallet.Get();
}


//"(JLjava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)Z"
static jboolean JNICALL nativeInitializeMasterWallet(JNIEnv *env, jobject clazz, jlong jWalletMgr, jstring jmasterWalletId
        ,jstring jmnemonic, jstring jphrasePassword, jstring jpayPassword)
{
    const char* masterWalletId = env->GetStringUTFChars(jmasterWalletId, NULL);
    const char* phrasePassword = env->GetStringUTFChars(jphrasePassword, NULL);
    const char* payPassword = env->GetStringUTFChars(jpayPassword, NULL);
    const char* mnemonic = env->GetStringUTFChars(jmnemonic, NULL);

    IMasterWalletManager* walletManager = (IMasterWalletManager*)jWalletMgr;
    Boolean success = FALSE;
    walletManager->InitializeMasterWallet(String(masterWalletId), String(mnemonic), String(phrasePassword)
            , String(payPassword), &success);

    env->ReleaseStringUTFChars(jmasterWalletId, masterWalletId);
    env->ReleaseStringUTFChars(jphrasePassword, phrasePassword);
    env->ReleaseStringUTFChars(jpayPassword, payPassword);
    env->ReleaseStringUTFChars(jmnemonic, mnemonic);
    return (jboolean)success;
}


static void JNICALL nativeDestroyWallet(JNIEnv *env, jobject clazz, jlong jWalletMgr, jstring jmasterWalletId)
{
    const char* masterWalletId = env->GetStringUTFChars(jmasterWalletId, NULL);
    IMasterWalletManager* walletManager = (IMasterWalletManager*)jWalletMgr;
    walletManager->DestroyWallet(String(masterWalletId));
    env->ReleaseStringUTFChars(jmasterWalletId, masterWalletId);
}

static jlong JNICALL nativeImportWalletWithKeystore(JNIEnv *env, jobject clazz, jlong jWalletMgr, jstring jmasterWalletId, jstring jkeystorePath,
        jstring jbackupPassword, jstring jpayPassword, jstring jphrasePassword)
{
    const char* masterWalletId = env->GetStringUTFChars(jmasterWalletId, NULL);
    const char* keystorePath = env->GetStringUTFChars(jkeystorePath, NULL);
    const char* backupPassword = env->GetStringUTFChars(jbackupPassword, NULL);
    const char* payPassword = env->GetStringUTFChars(jpayPassword, NULL);
    const char* phrasePassword = env->GetStringUTFChars(jphrasePassword, NULL);

    IMasterWalletManager* walletManager = (IMasterWalletManager*)jWalletMgr;
    AutoPtr<IMasterWallet> masterWallet;
    walletManager->ImportWalletWithKeystore(String(masterWalletId), String(keystorePath), String(backupPassword),
                                            String(payPassword), String(phrasePassword), (IMasterWallet**)&masterWallet);

    env->ReleaseStringUTFChars(jmasterWalletId, masterWalletId);
    env->ReleaseStringUTFChars(jkeystorePath, keystorePath);
    env->ReleaseStringUTFChars(jbackupPassword, backupPassword);
    env->ReleaseStringUTFChars(jpayPassword, payPassword);
    env->ReleaseStringUTFChars(jphrasePassword, phrasePassword);
    return (jlong)masterWallet.Get();
}

static jlong JNICALL nativeImportWalletWithMnemonic(JNIEnv *env, jobject clazz, jlong jWalletMgr, jstring jmasterWalletId,
        jstring jmnemonic, jstring jphrasePassword, jstring jpayPassword, jstring jlanguage)
{
    const char* masterWalletId = env->GetStringUTFChars(jmasterWalletId, NULL);
    const char* mnemonic = env->GetStringUTFChars(jmnemonic, NULL);
    const char* phrasePassword = env->GetStringUTFChars(jphrasePassword, NULL);
    const char* payPassword = env->GetStringUTFChars(jpayPassword, NULL);
    const char* language = env->GetStringUTFChars(jlanguage, NULL);

    IMasterWalletManager* walletManager = (IMasterWalletManager*)jWalletMgr;
    AutoPtr<IMasterWallet> masterWallet;
    walletManager->ImportWalletWithMnemonic(String(masterWalletId), String(mnemonic), String(phrasePassword),
                                            String(payPassword), String(language), (IMasterWallet**)&masterWallet);

    env->ReleaseStringUTFChars(jmasterWalletId, masterWalletId);
    env->ReleaseStringUTFChars(jmnemonic, mnemonic);
    env->ReleaseStringUTFChars(jphrasePassword, phrasePassword);
    env->ReleaseStringUTFChars(jpayPassword, payPassword);
    env->ReleaseStringUTFChars(jlanguage, language);
    return (jlong)masterWallet.Get();
}

static void JNICALL nativeExportWalletWithKeystore(JNIEnv *env, jobject clazz, jlong jWalletMgr, jobject jmasterWallet,
        jstring jbackupPassword, jstring jpayPassword, jstring jkeystorePath)
{
    const char* backupPassword = env->GetStringUTFChars(jbackupPassword, NULL);
    const char* payPassword = env->GetStringUTFChars(jpayPassword, NULL);
    const char* keystorePath = env->GetStringUTFChars(jkeystorePath, NULL);

    jclass cls = env->FindClass(CLASS_MASTERWALLET);
    long masterProxy = GetJavaLongField(env, cls, jmasterWallet, FIELD_MASTERWALLET);
    CheckErrorAndLog(env, "nativeExportWalletWithKeystore", __LINE__);
    IMasterWallet* masterWallet = (IMasterWallet*)masterProxy;
    IMasterWalletManager* walletManager = (IMasterWalletManager*)jWalletMgr;
    walletManager->ExportWalletWithKeystore(masterWallet, String(backupPassword), String(payPassword), String(keystorePath));

    env->ReleaseStringUTFChars(jbackupPassword, backupPassword);
    env->ReleaseStringUTFChars(jpayPassword, payPassword);
    env->ReleaseStringUTFChars(jkeystorePath, keystorePath);
}

static jstring JNICALL nativeExportWalletWithMnemonic(JNIEnv *env, jobject clazz, jlong jWalletMgr,
        jobject jmasterWallet, jstring jpayPassword)
{
    jclass cls = env->FindClass(CLASS_MASTERWALLET);
    long masterProxy = GetJavaLongField(env, cls, jmasterWallet, FIELD_MASTERWALLET);
    CheckErrorAndLog(env, "nativeExportWalletWithMnemonic", __LINE__);
    IMasterWallet* masterWallet = (IMasterWallet*)masterProxy;

    const char* payPassword = env->GetStringUTFChars(jpayPassword, NULL);

    IMasterWalletManager* walletManager = (IMasterWalletManager*)jWalletMgr;
    String mnemonic;
    walletManager->ExportWalletWithMnemonic(masterWallet, String(payPassword), &mnemonic);
    jstring jstr = env->NewStringUTF(mnemonic.string());

    env->ReleaseStringUTFChars(jpayPassword, payPassword);
    return jstr;
}

//"(J)[J"
static jlongArray JNICALL nativeGetAllMasterWallets(JNIEnv *env, jobject clazz, jlong jWalletMgr)
{
    IMasterWalletManager* walletManager = (IMasterWalletManager*)jWalletMgr;
    AutoPtr<ArrayOf<IMasterWallet*> > array;
    walletManager->GetAllMasterWallets((ArrayOf<IMasterWallet*>**)&array);

    if (array != NULL) {
        const int length = array->GetLength();
        jlong* proxies = new jlong[length];
        for (int i = 0; i < length; ++i) {
            AutoPtr<IMasterWallet> masterWallet = (*array)[i];
            proxies[i] = (jlong)masterWallet.Get();
            masterWallet->AddRef();
        }

        jlongArray jarray = env->NewLongArray(length);
        env->SetLongArrayRegion(jarray, 0, length, proxies);
        delete[] proxies;
        return jarray;
    }
    return NULL;
}

static const JNINativeMethod gMethods[] = {
        {"nativeCreateMasterWallet", "(JLjava/lang/String;Ljava/lang/String;)J", (void*)nativeCreateMasterWallet},
        {"nativeDisposeNative", "(J)V", (void*)nativeDisposeNative},
        {"nativeDestroyWallet", "(JLjava/lang/String;)V", (void*)nativeDestroyWallet},
        {"nativeImportWalletWithKeystore", "(JLjava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)J", (void*)nativeImportWalletWithKeystore},
        {"nativeImportWalletWithMnemonic", "(JLjava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)J", (void*)nativeImportWalletWithMnemonic},
        {"nativeExportWalletWithKeystore", "(JLcom/elastos/spvcore/IMasterWallet;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", (void*)nativeExportWalletWithKeystore},
        {"nativeExportWalletWithMnemonic", "(JLcom/elastos/spvcore/IMasterWallet;Ljava/lang/String;)Ljava/lang/String;", (void*)nativeExportWalletWithMnemonic},
        {"nativeGetAllMasterWallets", "(J)[J", (void*)nativeGetAllMasterWallets},
        {"nativeInitializeMasterWallet", "(JLjava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)Z", (void*)nativeInitializeMasterWallet},
};

int register_elastos_spv_IMasterWalletManager(JNIEnv *env)
{
    return jniRegisterNativeMethods(env, "com/elastos/spvcore/IMasterWalletManager",
        gMethods, NELEM(gMethods));
}

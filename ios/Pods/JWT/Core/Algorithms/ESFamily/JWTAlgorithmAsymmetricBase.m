//
//  JWTAlgorithmAsymmetricBase.m
//  Base64
//
//  Created by Lobanov Dmitry on 12.03.2018.
//

#import "JWTAlgorithmAsymmetricBase.h"
#import "JWTBase64Coder.h"
#import "JWTCryptoSecurity.h"
#import "JWTCryptoKeyExtractor.h"
#import "JWTCryptoKey.h"
#import "JWTAlgorithmFactory.h"
#import <Availability.h>

#ifndef IPHONE_SDK_VERSION_GREATER_THAN_10
#define IPHONE_SDK_VERSION_GREATER_THAN_10 (__IPHONE_OS_VERSION_MAX_ALLOWED && __IPHONE_OS_VERSION_MAX_ALLOWED >= 100000)
#endif

#ifndef MAC_OS_SDK_VERSION_GREATER_THAN_10_12
#define MAC_OS_SDK_VERSION_GREATER_THAN_10_12 (__MAC_OS_X_VERSION_MAX_ALLOWED && __MAC_OS_X_VERSION_MAX_ALLOWED >= 101200)
#endif

// Abilities
#ifndef JWT_CRYPTO_MODERN_API_IS_ALLOWED
#define JWT_CRYPTO_MODERN_API_IS_ALLOWED ((IPHONE_SDK_VERSION_GREATER_THAN_10) || (MAC_OS_SDK_VERSION_GREATER_THAN_10_12))
#endif

// #ifndef IPHONE_OS_VERSION_GREATER_THAN_10
// #define IPHONE_OS_VERSION_GREATER_THAN_10 (defined(__IPHONE_OS_VERSION_MIN_REQUIRED) && __IPHONE_OS_VERSION_MIN_REQUIRED >= 100000)
// #endif

// #ifndef MAC_OS_VERSION_GREATER_THAN_10
// #define MAC_OS_VERSION_GREATER_THAN_10 (defined(__MAC_OS_X_VERSION_MIN_REQUIRED) && __MAC_OS_X_VERSION_MIN_REQUIRED >= 101200)
// #endif

// // Requirements
// #ifndef JWT_CRYPTO_MODERN_API_IS_REQUIRED
// #define JWT_CRYPTO_MODERN_API_IS_REQUIRED ((IPHONE_OS_VERSION_GREATER_THAN_10) || (MAC_OS_VERSION_GREATER_THAN_10))
// #endif

// TODO:
// Rewrite errors presentation.
NSString *const JWTAlgorithmAsymmetricFamilyErrorDomain = @"io.jwt.jwa.asymmetric";

@implementation JWTAlgorithmAsymmetricFamilyErrorDescription
// Subclass
+ (NSString *)errorDomain {
    return JWTAlgorithmAsymmetricFamilyErrorDomain;
}
+ (NSInteger)defaultErrorCode {
    return JWTAlgorithmAsymmetricFamilyErrorUnexpected;
}
+ (NSInteger)externalErrorCode {
    return JWTAlgorithmAsymmetricFamilyErrorInternalSecurityAPI;
}
+ (NSDictionary *)codesAndUserDescriptions {
    static NSDictionary *dictionary = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        dictionary = @{
                       @(JWTAlgorithmAsymmetricFamilyErrorAlgorithmIsNotSupported) : @"Algorithm is not supported!",
                       @(JWTAlgorithmAsymmetricFamilyErrorInternalSecurityAPI) : @"algorithm internal security framework error!",
                       @(JWTAlgorithmAsymmetricFamilyErrorUnexpected) : @"Asymmetric algorithm unexpected error!"
                       };
    });
    return dictionary;
}
+ (NSDictionary *)codesAndDescriptions {
    static NSDictionary *dictionary = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        dictionary = @{
                       @(JWTAlgorithmAsymmetricFamilyErrorAlgorithmIsNotSupported) : @"JWTAlgorithmAsymmetricFamilyErrorAlgorithmIsNotSupported",
                       @(JWTAlgorithmAsymmetricFamilyErrorInternalSecurityAPI) : @"JWTAlgorithmAsymmetricFamilyErrorInternalSecurityAPI",
                       @(JWTAlgorithmAsymmetricFamilyErrorUnexpected) : @"JWTAlgorithmAsymmetricFamilyErrorUnexpected"
                       };
    });
    return dictionary;
}
@end

typedef NS_ENUM(NSInteger, JWTAlgorithmAsymmetricBase__AlgorithmType) {
    JWTAlgorithmAsymmetricBase__AlgorithmType__RS,
    JWTAlgorithmAsymmetricBase__AlgorithmType__ES
};
typedef NS_ENUM(NSInteger, JWTAlgorithmAsymmetricBase__AlgorithmNumber) {
    JWTAlgorithmAsymmetricBase__AlgorithmNumber__256,
    JWTAlgorithmAsymmetricBase__AlgorithmNumber__384,
    JWTAlgorithmAsymmetricBase__AlgorithmNumber__512
};
@interface JWTAlgorithmAsymmetricBase ()
@property (copy, nonatomic, readwrite) NSNumber *algorithmType;
@property (copy, nonatomic, readwrite) NSNumber *algorithmNumber;
@property (strong, nonatomic, readonly) id <JWTCryptoKeyExtractorProtocol> keyExtractor;
@property (copy, nonatomic, readwrite) JWTAlgorithmAsymmetricBase *(^setAlgorithmType)(JWTAlgorithmAsymmetricBase__AlgorithmType);
@property (copy, nonatomic, readwrite) JWTAlgorithmAsymmetricBase *(^setAlgorithmNumber)(JWTAlgorithmAsymmetricBase__AlgorithmNumber);
@end

@implementation JWTAlgorithmAsymmetricBase
@synthesize keyExtractorType;
@synthesize signKey;
@synthesize verifyKey;
@synthesize privateKeyCertificatePassphrase;
- (void)setupFluent {
    __weak typeof(self) weakSelf = self;
    self.setAlgorithmType = ^(JWTAlgorithmAsymmetricBase__AlgorithmType type) {
        weakSelf.algorithmType = @(type);
        return weakSelf;
    };
    self.setAlgorithmNumber = ^(JWTAlgorithmAsymmetricBase__AlgorithmNumber number) {
        weakSelf.algorithmNumber = @(number);
        return weakSelf;
    };
}
- (instancetype)init {
    self = [super init];
    if (self) {
        [self setupFluent];
    }
    return self;
}

- (id<JWTCryptoKeyExtractorProtocol>)keyExtractor {
    return [JWTCryptoKeyExtractor createWithType:self.keyExtractorType];
}
@end

@interface JWTAlgorithmAsymmetricBase (SignAndVerify)
#pragma mark - Private ( Override-part depends on platform )
- (BOOL)verifyData:(NSData *)plainData signature:(NSData *)signature key:(SecKeyRef)publicKey error:(NSError *__autoreleasing*)error;
- (NSData *)signData:(NSData *)plainData key:(SecKeyRef)privateKey error:(NSError *__autoreleasing*)error;
@end

@implementation JWTAlgorithmAsymmetricBase (SignAndVerify)
#pragma mark - Private ( Override-part depends on platform )
- (BOOL)verifyData:(NSData *)plainData signature:(NSData *)signature key:(SecKeyRef)publicKey error:(NSError *__autoreleasing*)error {
    return NO;
}

- (NSData *)signData:(NSData *)plainData key:(SecKeyRef)privateKey error:(NSError *__autoreleasing*)error {
    return nil;
}
@end

@implementation JWTAlgorithmAsymmetricBase (JWTAsymmetricKeysAlgorithm)
@dynamic privateKeyCertificatePassphrase;
- (NSString *)name {
    return @"AssymetricBase";
}

- (NSData *)signHash:(NSData *)hash key:(NSData *)key error:(NSError *__autoreleasing *)error {
    return nil;
}

- (BOOL)verifyHash:(NSData *)hash signature:(NSData *)signature key:(NSData *)key error:(NSError *__autoreleasing *)error {
    return NO;
}

- (NSData *)encodePayload:(NSString *)theString withSecret:(NSString *)theSecret {
    return nil;
}

- (BOOL)verifySignedInput:(NSString *)input withSignature:(NSString *)signature verificationKey:(NSString *)verificationKey {
    return NO;
}

#pragma mark - NSCopying
- (id)copyWithZone:(NSZone *)zone {
    // create new.
    id <JWTRSAlgorithm> algorithm = (id<JWTRSAlgorithm>)[JWTAlgorithmFactory algorithmByName:[self name]];
    algorithm.privateKeyCertificatePassphrase = self.privateKeyCertificatePassphrase;
    algorithm.keyExtractorType = self.keyExtractorType;
    algorithm.signKey = self.signKey;
    algorithm.verifyKey = self.verifyKey;
    return algorithm;
}
@end

@interface JWTAlgorithmAsymmetricBase__Prior10 : JWTAlgorithmAsymmetricBase @end
@implementation JWTAlgorithmAsymmetricBase__Prior10 @end

#import <Security/Security.h>

#if JWT_CRYPTO_MODERN_API_IS_ALLOWED
#ifdef NS_AVAILABLE
NS_AVAILABLE(10_12, 10_0)
#endif
@interface JWTAlgorithmAsymmetricBase__After10
: JWTAlgorithmAsymmetricBase
@property (assign, nonatomic, readonly) SecKeyAlgorithm algorithm;
@end
@implementation JWTAlgorithmAsymmetricBase__After10
- (SecKeyAlgorithm)chooseAlgorithmByType:(NSNumber *)type number:(NSNumber *)number {
    if (SecKeyIsAlgorithmSupported == NULL) {
        return NULL;
    }
    else {
        SecKeyAlgorithm result = NULL;
        switch ((JWTAlgorithmAsymmetricBase__AlgorithmType)type.integerValue) {
            case JWTAlgorithmAsymmetricBase__AlgorithmType__RS: {
                switch ((JWTAlgorithmAsymmetricBase__AlgorithmNumber)number.integerValue) {
                    case JWTAlgorithmAsymmetricBase__AlgorithmNumber__256: {
                        result = kSecKeyAlgorithmRSASignatureMessagePKCS1v15SHA256;
                        break;
                    }
                    case JWTAlgorithmAsymmetricBase__AlgorithmNumber__384: {
                        result = kSecKeyAlgorithmRSASignatureMessagePKCS1v15SHA384;
                        break;
                    }
                    case JWTAlgorithmAsymmetricBase__AlgorithmNumber__512: {
                        result = kSecKeyAlgorithmRSASignatureMessagePKCS1v15SHA512;
                        break;
                    }
                    default:
                        break;
                }
                break;
            }
            case JWTAlgorithmAsymmetricBase__AlgorithmType__ES: {
                switch ((JWTAlgorithmAsymmetricBase__AlgorithmNumber)number.integerValue) {
                    case JWTAlgorithmAsymmetricBase__AlgorithmNumber__256: {
                        result = kSecKeyAlgorithmECDSASignatureMessageX962SHA256;
                        break;
                    }
                    case JWTAlgorithmAsymmetricBase__AlgorithmNumber__384: {
                        result = kSecKeyAlgorithmECDSASignatureMessageX962SHA384;
                        break;
                    }
                    case JWTAlgorithmAsymmetricBase__AlgorithmNumber__512: {
                        result = kSecKeyAlgorithmECDSASignatureMessageX962SHA512;
                        break;
                    }
                    default:
                        break;
                }
                break;
            }
            default:
                break;
        }
        return result;
    }
}

- (SecKeyAlgorithm)algorithm {
    return [self chooseAlgorithmByType:self.algorithmType number:self.algorithmNumber];
}
@end

@implementation JWTAlgorithmAsymmetricBase__After10 (SignAndVerify)
- (NSData *)signData:(NSData *)plainData key:(SecKeyRef)privateKey error:(NSError *__autoreleasing *)error {
    if (SecKeyIsAlgorithmSupported == NULL) {
        if (error) {
            *error = [JWTAlgorithmAsymmetricFamilyErrorDescription errorWithCode:JWTAlgorithmAsymmetricFamilyErrorAlgorithmIsNotSupported];
        }
        return nil;
    }
    else {
        CFErrorRef theError = NULL;
        NSData *result = (__bridge NSData *)SecKeyCreateSignature(privateKey, self.algorithm, (__bridge CFDataRef)plainData, &theError);
        if (error && theError) {
            *error = (__bridge NSError *)(theError);
        }
        return result;
    }
}
- (BOOL)verifyData:(NSData *)plainData signature:(NSData *)signature key:(SecKeyRef)publicKey error:(NSError *__autoreleasing *)error {
    if (SecKeyIsAlgorithmSupported == NULL) {
        if (error) {
            *error = [JWTAlgorithmAsymmetricFamilyErrorDescription errorWithCode:JWTAlgorithmAsymmetricFamilyErrorAlgorithmIsNotSupported];
        }
        return NO;
    }
    else {
        CFErrorRef theError = NULL;
        BOOL result = SecKeyVerifySignature(publicKey, self.algorithm, (__bridge CFDataRef)plainData, (__bridge CFDataRef)signature, &theError);
        if (error && theError) {
            *error = (__bridge NSError *)(theError);
        }
        return result;
    }
}
@end

@implementation JWTAlgorithmAsymmetricBase__After10 (JWTAsymmetricKeysAlgorithm)
#pragma mark - JWTAlgorithm
- (NSDictionary *)verifyKeyExtractorParameters {
    switch ((JWTAlgorithmAsymmetricBase__AlgorithmType)self.algorithmType.integerValue) {
        case JWTAlgorithmAsymmetricBase__AlgorithmType__RS: return @{[JWTCryptoKey parametersKeyBuilder] : [JWTCryptoKeyBuilder new].keyTypeRSA};
        case JWTAlgorithmAsymmetricBase__AlgorithmType__ES: return @{[JWTCryptoKey parametersKeyBuilder] : [JWTCryptoKeyBuilder new].keyTypeEC};
        default: return nil;
    }
}
- (NSDictionary *)signKeyExtractorParameters {
    NSMutableDictionary *mutableDictionary = [[self verifyKeyExtractorParameters] mutableCopy];
    mutableDictionary[[JWTCryptoKeyExtractor parametersKeyCertificatePassphrase]] = self.privateKeyCertificatePassphrase ?: [NSNull null];
    return [mutableDictionary copy];
}
- (NSData *)signHash:(NSData *)hash key:(NSData *)key error:(NSError *__autoreleasing *)error {
    NSData *result = nil;
    if (self.signKey || self.keyExtractor) {
        NSError *extractKeyError = nil;
        id <JWTCryptoKeyProtocol> keyItem = self.signKey ?: [self.keyExtractor keyFromData:key parameters:[self signKeyExtractorParameters] error:&extractKeyError];

        if (extractKeyError || keyItem == nil) {
            // tell about error
            if (extractKeyError && error) {
                *error = extractKeyError;
            }
            NSError *removeError = nil;
            [JWTCryptoSecurity removeKeyByTag:keyItem.tag error:&removeError];
            if (removeError && error) {
                *error = removeError;
            }
        }
        else {
            NSError *signError = nil;
            result = [self signData:hash key:keyItem.key error:&signError];
            if (signError && error) {
                *error = signError;
            }
        }
    }
    else {
        SecIdentityRef identity = nil;
        SecTrustRef trust = nil;

        //        [JWTCryptoSecurity extractIdentityAndTrustFromPKCS12:inPKCS12Data password:keyPassword identity:outIdentity trust:outTrust];
        [JWTCryptoSecurity extractIdentityAndTrustFromPKCS12:(__bridge CFDataRef)(key) password: (__bridge CFStringRef)(self.privateKeyCertificatePassphrase) identity:&identity trust:&trust];

        if (identity && trust) {
            SecKeyRef privateKey;
            SecIdentityCopyPrivateKey(identity, &privateKey);

            NSError *signError = nil;
            result = [self signData:hash key:privateKey error:&signError];
            if (signError && error) {
                *error = signError;
            }

            if (privateKey) {
                CFRelease(privateKey);
            }
        }

        if (identity) {
            CFRelease(identity);
        }

        if (trust) {
            CFRelease(trust);
        }
    }
    return result;
}
- (BOOL)verifyHash:(NSData *)hash signature:(NSData *)signature key:(NSData *)key error:(NSError *__autoreleasing *)error {
    if (self.verifyKey || self.keyExtractor) {
        NSError *extractKeyError = nil;
        id<JWTCryptoKeyProtocol> keyItem = self.verifyKey ?: [self.keyExtractor keyFromData:key parameters:[self verifyKeyExtractorParameters] error:&extractKeyError];
        BOOL verified = NO;

        if (extractKeyError || keyItem == nil) {
            // error while getting key.
            // cleanup.
            // tell about error
            if (extractKeyError && error) {
                *error = extractKeyError;
            }
            NSError *removeError = nil;
            [JWTCryptoSecurity removeKeyByTag:keyItem.tag error:&removeError];
            if (removeError && error) {
                //???
                *error = removeError;
            }
            return verified;
        }
        else {
            NSError *verifyError = nil;
            verified = [self verifyData:hash signature:signature key:keyItem.key error:&verifyError];
            if (verifyError && error) {
                *error = verifyError;
            }
        }

        NSError *removeError = nil;
        [JWTCryptoSecurity removeKeyByTag:keyItem.tag error:&removeError];

        if (error && removeError) {
            *error = removeError;
        }

        return verified;
    }
    else {
        SecKeyRef publicKey = [JWTCryptoSecurity publicKeyFromCertificate:key];
        // TODO: special error handling here.
        // add error handling later?
        if (publicKey != NULL) {
            NSError *verifyError = nil;
            BOOL verified = [self verifyData:hash signature:signature key:publicKey error:&verifyError];
            if (verifyError && error) {
                *error = verifyError;
            }
            CFRelease(publicKey);
            return verified;
        }
    }
    return NO;
}

- (NSData *)encodePayload:(NSString *)theString withSecret:(NSString *)theSecret {
    return [self encodePayloadData:[theString dataUsingEncoding:NSUTF8StringEncoding] withSecret:[JWTBase64Coder dataWithBase64UrlEncodedString:theSecret]];
}
- (NSData *)encodePayloadData:(NSData *)theStringData withSecret:(NSData *)theSecretData {
    return [self signHash:theStringData key:theSecretData error:nil];
}
- (BOOL)verifySignedInput:(NSString *)input withSignature:(NSString *)signature verificationKey:(NSString *)verificationKey {
    NSData *certificateData = [JWTBase64Coder dataWithBase64UrlEncodedString:verificationKey];
    return [self verifySignedInput:input withSignature:signature verificationKeyData:certificateData];
}
- (BOOL)verifySignedInput:(NSString *)input withSignature:(NSString *)signature verificationKeyData:(NSData *)verificationKeyData {
    return [self verifyHash:[input dataUsingEncoding:NSUTF8StringEncoding] signature:[JWTBase64Coder dataWithBase64UrlEncodedString:signature] key:verificationKeyData error:nil];
}
@end
#endif

//// MacOS OR iOS is Base
//#if TARGET_OS_MAC && !TARGET_OS_IPHONE // check that mac version is ok.
//@interface JWTAlgorithmRSFamilyMember : JWTAlgorithmRSBaseMac @end
//#else // check that iphone version is ok.
//@interface JWTAlgorithmRSFamilyMember : JWTAlgorithmRSBaseIOS @end
//#endif
// (TARGET_OS_IPHONE && __IPHONE_OS_VERSION_MIN_REQUIRED >= __IPHONE_10_0) ||
@interface JWTAlgorithmAsymmetricBase__FamilyMember :
#if JWT_CRYPTO_MODERN_API_IS_ALLOWED
JWTAlgorithmAsymmetricBase__After10
#else
JWTAlgorithmAsymmetricBase__Prior10
#endif
@end

@implementation JWTAlgorithmAsymmetricBase__FamilyMember
- (NSString *)stringForAlgorithmNumber:(JWTAlgorithmAsymmetricBase__AlgorithmNumber)number {
    switch (number) {
        case JWTAlgorithmAsymmetricBase__AlgorithmNumber__256: return @"256";
        case JWTAlgorithmAsymmetricBase__AlgorithmNumber__384: return @"384";
        case JWTAlgorithmAsymmetricBase__AlgorithmNumber__512: return @"512";
        default: return nil;
    }
}

- (NSString *)stringForAlgorithmType:(JWTAlgorithmAsymmetricBase__AlgorithmType)type {
    switch (type) {
        case JWTAlgorithmAsymmetricBase__AlgorithmType__RS: return @"RS";
        case JWTAlgorithmAsymmetricBase__AlgorithmType__ES: return @"ES";
        default: return nil;
    }
}

- (NSString *)name {
    return [[self stringForAlgorithmType:(JWTAlgorithmAsymmetricBase__AlgorithmType)self.algorithmType.integerValue] stringByAppendingString:[self stringForAlgorithmNumber:(JWTAlgorithmAsymmetricBase__AlgorithmNumber)self.algorithmNumber.integerValue]];
}
@end

@interface JWTAlgorithmAsymmetricBase__FamilyMember__RS : JWTAlgorithmAsymmetricBase__FamilyMember @end

@implementation JWTAlgorithmAsymmetricBase__FamilyMember__RS
- (NSNumber *)algorithmType {
    return @(JWTAlgorithmAsymmetricBase__AlgorithmType__RS);
}
@end

@interface JWTAlgorithmAsymmetricBase__FamilyMember__ES : JWTAlgorithmAsymmetricBase__FamilyMember @end

@implementation JWTAlgorithmAsymmetricBase__FamilyMember__ES
- (NSNumber *)algorithmType {
    return @(JWTAlgorithmAsymmetricBase__AlgorithmType__ES);
}
@end

@implementation JWTAlgorithmAsymmetricBase (Create)
+ (instancetype)withRS {
    return [[JWTAlgorithmAsymmetricBase__FamilyMember__RS alloc] init];
}
+ (instancetype)withES {
    return [[JWTAlgorithmAsymmetricBase__FamilyMember__ES alloc] init];
}
- (instancetype)with256 {
    return self.setAlgorithmNumber(JWTAlgorithmAsymmetricBase__AlgorithmNumber__256);
}
- (instancetype)with384 {
    return self.setAlgorithmNumber(JWTAlgorithmAsymmetricBase__AlgorithmNumber__384);
}
- (instancetype)with512 {
    return self.setAlgorithmNumber(JWTAlgorithmAsymmetricBase__AlgorithmNumber__512);
}
@end

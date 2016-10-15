//
//  AppDelegate.swift
//  <%= appname %>
//
//

import UIKit
import TVMLKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate, TVApplicationControllerDelegate {

  // MARK: Members
  let resourceLoader = ResourceLoader()
  var window: UIWindow?
  var appController: TVApplicationController?


  static func getAppURL()-> URL{
    var appURL:URL;
    #if (arch(i386) || arch(x86_64)) && os(tvOS)
      appURL = URL(string: "http://localhost:8080/dist/scripts/application.js")!
    #else
      appURL = NSBundle.mainBundle().URLForResource("application", withExtension: "js",subdirectory: "dist/scripts")!
    #endif
    return appURL;
  }

  func registerSettingsBundle(){
    UserDefaults.standard.register(defaults: [
      "flynn_couchdb_url" : "http://localhost:6984/"
      ])
  }

  func defaultsChanged(){
    //Get the defaults
    let defaults = UserDefaults.standard
    let backendURL: String = defaults.string(forKey: "flynn_couchdb_url")!
  }

  // MARK: Javascript Execution Helper

  func executeRemoteMethod(_ methodName: String,arguments: Array<AnyObject>?, completion: @escaping (Bool) -> Void) {
    appController?.evaluate(inJavaScriptContext: { (context: JSContext) in
      let appObject : JSValue = context.objectForKeyedSubscript("App")

      if appObject.hasProperty(methodName) {
        appObject.invokeMethod(methodName,  withArguments: arguments! as [AnyObject])
      }
      }, completion: completion)
  }

  // MARK: UIApplicationDelegate
  func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
    self.window = UIWindow(frame: UIScreen.main.bounds)

    let appControllerContext = TVApplicationControllerContext()

    let javascriptURL = AppDelegate.getAppURL()

    appControllerContext.javaScriptApplicationURL = javascriptURL
    if let options = launchOptions {
      for (kind, value) in options {
        if let kindStr = kind as? String {
          appControllerContext.launchOptions[kindStr] = value
        }
      }
    }

    // provide BASEURL
    appControllerContext.launchOptions["BASEURL"] = resourceLoader.getBasePath();
    appController = TVApplicationController(context: appControllerContext, window: self.window, delegate: self)

    return true
  }


  func applicationWillResignActive(_ application: UIApplication) {
    // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
    // Use this method to pause ongoing tasks, disable timers, and stop playback
    executeRemoteMethod("onWillResignActive",arguments: [], completion: { (success: Bool) in
      // ...
    })
  }

  func applicationDidEnterBackground(_ application: UIApplication) {
    // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
    // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
    executeRemoteMethod("onDidEnterBackground",arguments: [], completion: { (success: Bool) in
      // ...
    })
  }

  func applicationWillEnterForeground(_ application: UIApplication) {
    // Called as part of the transition from the background to the inactive state; here you can undo many of the changes made on entering the background.
    executeRemoteMethod("onWillEnterForeground",arguments: [], completion: { (success: Bool) in
      // ...
    })
  }

  func applicationDidBecomeActive(_ application: UIApplication) {
    // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
    executeRemoteMethod("onDidBecomeActive",arguments: [], completion: { (success: Bool) in
      // ...
    })
  }

  func applicationWillTerminate(_ application: UIApplication) {
    // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
    executeRemoteMethod("onWillTerminate",arguments: [], completion: { (success: Bool) in
      // ...
    })
  }

  // MARK: TVApplicationControllerDelegate

  func appController(_ appController: TVApplicationController, didFinishLaunching options: [String: Any]?) {
    print("\(#function) invoked with options: \(options)")
    self.registerSettingsBundle()
    self.defaultsChanged()
    NotificationCenter.default.addObserver(self,
                                                     selector: #selector(AppDelegate.defaultsChanged),
                                                     name: UserDefaults.didChangeNotification,
                                                     object: nil)

  }

  func appController(_ appController: TVApplicationController, didFail error: Error) {
    print("\(#function) invoked with error: \(error)")

    let title = "Error Launching Application"
    let message = error.localizedDescription
    let alertController = UIAlertController(title: title, message: message, preferredStyle:.alert )

    self.appController?.navigationController.present(alertController, animated: true, completion: {
      // ...
    })
  }

  func appController(_ appController: TVApplicationController, didStop options: [String: Any]?) {
    print("\(#function) invoked with options: \(options)")
  }
}

//
//  ResourceLoader.swift
//  <%= appname %>
//
//

import Foundation
import JavaScriptCore


@objc protocol ResourceLoaderExport : JSExport {
  func getBasePath() -> String
  func getPath(_ name: String, _ directory: String! ) -> String
  func loadBundleResource(_ name: String, _ directory: String! ) -> String
  static func create() -> ResourceLoaderExport
}


@objc class ResourceLoader: NSObject, ResourceLoaderExport {

  func getBasePath( ) -> String {
    return  Bundle.main.resourcePath!;
  }

  func getPath(_ name: String, _ directory: String! ) -> String {
    let path :String?
    if directory != nil {
      path = Bundle.main.path(forResource: name, ofType: nil,inDirectory:directory)
    } else {
      path = Bundle.main.path(forResource: name, ofType: nil)
    }
    return path!
  }

  func loadBundleResource(_ name: String, _ directory: String!) -> String {
    let path :String? = getPath(name, directory)
    let fileContent: String
    do {
      fileContent = try String(contentsOfFile: path!, encoding: String.Encoding.utf8)
    } catch {
      print("There was a problem")
      return ""
    }
    return fileContent
  }

  static func create() -> ResourceLoaderExport {
    return ResourceLoader()
  }
}

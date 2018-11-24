
`import Util   from '../util/Util.js'`
`import Data   from '../util/Data.js'`
`import Stream from '../util/Stream.js'`
`import UI     from '../ui/UI.js'`
`import Page   from '../ui/Page.js'`
`import Surf3d from '../plots/Surf3d.js'`

class App

  Data.local   = "http://localhost:63342/plotly/public/" # Every app needs to change this
  Data.hosted  = "https://ui-48413.firebaseapp.com/" # Every app needs to change this
  Data.asyncJSON( "json/app.json", App.init )

  @init = ( data ) ->
    App.Specs  = Data.createPracs(data)
    UI.hasPack = false
    UI.hasTocs = true
    UI.hasLays = true

    Util.ready ->
      subjects = ["Ready","Select","Choice","Test"]
      subjects = subjects.concat( App.NavbSubjects )
      infoSpec = { subscribe:false, publish:false, subjects:["Select","Choice","Test"]}
      stream   = new Stream( subjects, infoSpec )
      ui       = new UI(  stream, App.Specs, App.NavbSpecs )
      app      = new App( stream, ui )
      app.ready()
      return
    return

  constructor:( @stream, @ui ) ->
    @stream.subscribe( "Ready", "App", () => @onReady() )
    @surf3d = new Surf3d( @stream, @ui )

  ready:() =>
    @ui.pagesReady( 'Image', false )
    return

  @NavbSubjects = ["Search","Contact","Settings","SignOn"]
  @NavbSpecs    = [
    { type:"NavBarLeft" }
    { type:"Item",      name:"Home",   icon:"fa-home", topic:UI.toTopic("View",'Navb',UI.SelectView), subject:"Select" }
    { type:"NavBarEnd" }
    { type:"NavBarRight"}
    { type:"Search",    name:"Search",    icon:"fa-search", size:"10", topic:'Search', subject:"Search" }
    { type:"Contact",   name:"Contact",   icon:"fa-user", topic:"http://twitter.com/TheTomFlaherty", subject:"Contact" }
    { type:"Dropdown",  name:"Settings",  icon:"fa-cog", items: [
      { type:"Item",    name:"Preferences", topic:"Preferences", subject:"Settings" }
      { type:"Item",    name:"Connection",  topic:"Connection",  subject:"Settings" }
      { type:"Item",    name:"Privacy",     topic:"Privacy",     subject:"Settings" } ] }
    { type:"SignOn",    name:"SignOn", icon:"fa-sign-in", size:"10", topic:'SignOn', subject:"SignOn" }
    { type:"NavBarEnd"  } ]


`export default App`


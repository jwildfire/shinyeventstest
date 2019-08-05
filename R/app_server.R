#' @import shiny
app_server <- function(input, output,session) {
  # List the first level callModules here
  output$testChart <- testChartRender(testChart())
  
  output$text <- renderText({
    req(input$selectedParticipant)
    paste("You clicked", input$selectedParticipant)
  })
}

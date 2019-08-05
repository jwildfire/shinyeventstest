#' testChart
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
testChart <- function() {

  # forward options using x
  rSettings = list(
    data = iris%>%rowid_to_column("seq")
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'testChart',
    rSettings,
    package = 'shinyeventstest'
  )
}

#' Shiny bindings for testChart
#'
#' Output and render functions for using testChart within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a testChart
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name testChart-shiny
#'
#' @export
testChartOutput <- function(outputId, width = '400px', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'testChart', width, height, package = 'shinyeventstest')
}

#' @rdname testChart-shiny
#' @export
testChartRender <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, testChartOutput, env, quoted = TRUE)
}

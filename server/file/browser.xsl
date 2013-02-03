<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  
  <xsl:output method="html"
    omit-xml-declaration="yes"
    doctype-public="-//W3C//DTD XHTML 1.0 Strict//EN"
    doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"/>

  <xsl:template match="/">
    <html>
      <head>
        <title>
          Class Scheduling
        </title>
        <link href="http://netdna.bootstrapcdn.com/twitter-bootstrap/2.2.2/css/bootstrap-combined.min.css" rel="stylesheet" />
        <link type="text/css" rel="stylesheet" href="/file/browser.css" />
      </head>
      <body>
        <h1>Class Scheduling</h1>
        <xsl:apply-templates select="//root/actions" />
        <xsl:apply-templates select="//root/list" />
        <xsl:apply-templates select="//root/error" />
      </body>
      <script src="http://netdna.bootstrapcdn.com/twitter-bootstrap/2.2.2/js/bootstrap.min.js"></script>
      <script src="http://code.jquery.com/jquery-latest.js"></script>
      <script src="/file/browser.js" type="text/javascript">//na</script>
    </html>
  </xsl:template>
  
  <xsl:template match="list">
    <div id="{@name}">
      <h2><xsl:value-of select="@name" /></h2>
      <xsl:apply-templates select="actions" />
      <dl>
        <xsl:apply-templates select="item" />
      </dl>
    </div> 
  </xsl:template>

  <xsl:template match="item">
      <dt>
        <xsl:apply-templates select="actions" />
      </dt>
      <dd>
        <xsl:apply-templates select="display"/>
      </dd>
  </xsl:template>  

  <xsl:template match="actions">
    <p class="links">
      <xsl:apply-templates select="link" />
    </p>
    <xsl:apply-templates select="template" />
  </xsl:template>
      
  <xsl:template match="display">
    <xsl:apply-templates select="data" mode="display"/>
  </xsl:template>
  
  <xsl:template match="link">
    <a href="{@href}" title="{@prompt}"><xsl:value-of select="@prompt"/></a>
  </xsl:template>
  
  <xsl:template match="template">
    <form action="{@href}" class="{@name}">
      <fieldset>
        <legend><xsl:value-of select="@name" /> : <xsl:value-of select="@action" /></legend>
        <xsl:apply-templates select="data" mode="input"/>
       </fieldset>
     </form>
  </xsl:template>
 
  <xsl:template match="data" mode="input">
    <p>
      <label><xsl:value-of select="@prompt" /></label>
      <input name="{@name}" value="{@value}"/>
    </p>
  </xsl:template>

  <xsl:template match="data" mode="display">
    <p>
      <label><xsl:value-of select="@prompt" /></label>
      <span><xsl:value-of select="@value"/></span>
    </p>
  </xsl:template>
  
  <xsl:template match="error">
    <div id="error">
      <h2>Error</h2>
      <xsl:apply-templates match="data" mode="display"/>
    </div>
  </xsl:template>
  
 </xsl:stylesheet>


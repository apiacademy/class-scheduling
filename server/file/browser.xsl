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
        <link type="text/css" rel="stylesheet" href="/file/browser.css" />
      </head>
      <body>
        <h1>Class Scheduling</h1>
        <xsl:apply-templates select="//root/actions" />
        <xsl:apply-templates select="//root/list" />
        <xsl:apply-templates select="//root/error" />
      </body>
      <script src="/file/browser.js" type="text/javascript">//na</script>
    </html>
  </xsl:template>
  
  <xsl:template match="list">
    <div id="{@name}" class="list-block">
      <h2><xsl:value-of select="@name" /></h2>
      <xsl:apply-templates select="actions" />
      <div>
        <xsl:apply-templates select="item" />
      </div>
    </div> 
  </xsl:template>

  <xsl:template match="item">
    <hr />
    <div class="item-display">
      <xsl:apply-templates select="display"/>
    </div>
    <div class="item-actions">
      <xsl:apply-templates select="actions" />
    </div>
  </xsl:template>  

  <xsl:template match="actions">
    <!--<p class="links">-->
      <xsl:apply-templates select="link" />
    <!--</p>-->  
    <xsl:apply-templates select="template" />  
  </xsl:template>
      
  <xsl:template match="display">
    <xsl:apply-templates select="data" mode="display"/>
  </xsl:template>
  
  <xsl:template match="link">
    <a href="{@href}" title="{@prompt}" class="link"><xsl:value-of select="@prompt"/></a>
  </xsl:template>
  
  <xsl:template match="template">
    <form action="{@href}" method="post" legend="{@action}">
      <fieldset>
        <legend><xsl:value-of select="@action"/></legend>
        <xsl:apply-templates select="data" mode="input"/> 
      <div class="form-actions">
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </div>
      </fieldset>    
    </form>
  </xsl:template>
 
  <xsl:template match="data" mode="input">
    <div class="control-group">
      <label class="control-label"><xsl:value-of select="@prompt" /></label>
      <div class="controls">
        <input name="{@name}" value="{@value}"/>
      </div>
    </div>
  </xsl:template>

  <xsl:template match="data" mode="display">
    <p>
      <label><xsl:value-of select="@prompt" /></label>
      <span><xsl:value-of select="@value"/></span>
    </p>
  </xsl:template>
  
  <xsl:template match="error">
    <div class="error">
      <h2>Error</h2>
      <xsl:apply-templates match="data" mode="display"/>
    </div>
  </xsl:template>
  
 </xsl:stylesheet>


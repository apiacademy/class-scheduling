<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <!--	
  <xsl:output method="html"
    omit-xml-declaration="yes"
    doctype-public="-//W3C//DTD XHTML 1.0 Strict//EN"
    doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"/>
  -->
  <xsl:output
    method="html"
    doctype-system="about:legacy-compat"
    encoding="UTF-8"
    indent="yes" />

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
	<p>To view records, select a menu item from above.</p>
        <xsl:apply-templates select="//root/list" />
        <xsl:apply-templates select="//root/error" />
      </body>
      <!--
      <script src="/file/browser.js" type="text/javascript">//na</script>
      -->
    </html>
  </xsl:template>
  
  <xsl:template match="list">
    <div id="{@name}" class="list-block">
      <h2><xsl:value-of select="@name" /></h2>
      <xsl:apply-templates select="actions" />
      <div clas="item-set">
        <xsl:apply-templates select="item" />
      </div>
    </div> 
  </xsl:template>

  <xsl:template match="item">
  <div class="item">
    <div class="item-display">
      <xsl:apply-templates select="display"/>
    </div>
    <div class="item-actions">
      <xsl:apply-templates select="actions" />
    </div>
  </div>  
  </xsl:template>  

  <xsl:template match="actions">
    <ul class="links">
      <xsl:apply-templates select="link" />
    </ul> 
    <xsl:apply-templates select="template" />  
  </xsl:template>
      
  <xsl:template match="display">
    <dl>
      <xsl:apply-templates select="data" mode="display"/>
    </dl>
  </xsl:template>
  
  <xsl:template match="link">
    <li><a href="{@href}" title="{@prompt}" class="link"><xsl:value-of select="@prompt"/></a></li>
  </xsl:template>
  
  <xsl:template match="template">
    <form action="{@href}" method="post" legend="{@action}">
      <fieldset>
        <legend><xsl:value-of select="@action"/></legend>
        <xsl:apply-templates select="data" mode="input"/> 
        <p class="form-actions">
          <button type="submit">Save</button>
          <button type="button">Cancel</button>
        </p>
      </fieldset>    
    </form>
  </xsl:template>
 
  <xsl:template match="data" mode="input">
    <p class="input">
      <label><xsl:value-of select="@prompt" /></label>
      <span><input name="{@name}" value="{@value}"/></span>
    </p>
  </xsl:template>

  <xsl:template match="data" mode="display">
    <dt><xsl:value-of select="@prompt" /></dt>
    <dd><xsl:value-of select="@value"/></dd>
  </xsl:template>
  
  <xsl:template match="error">
    <div class="error">
      <h2>Error</h2>
      <xsl:apply-templates match="data" mode="display"/>
    </div>
  </xsl:template>
  
 </xsl:stylesheet>


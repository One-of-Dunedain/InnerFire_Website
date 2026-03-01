Add-Type -AssemblyName System.Drawing

$dest = "assets/images/apps"
if (!(Test-Path $dest)) {
  New-Item -ItemType Directory -Path $dest | Out-Null
}

$map = [ordered]@{
  "breathwrk.png"      = "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/30/88/7e/30887eee-124e-def5-2d13-685a805ecc7c/AppIcon-0-0-1x_U007ephone-0-1-0-85-220.png/512x512bb.jpg"
  "headspace.png"      = "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/5b/b2/69/5bb269aa-8622-c32b-cc65-45b5cd5d5c2e/AppIcon-0-0-1x_U007epad-0-1-0-sRGB-85-220.png/512x512bb.jpg"
  "box-breathe.png"    = "https://is1-ssl.mzstatic.com/image/thumb/Purple114/v4/f5/52/fd/f552fd2d-ef6e-60f2-4dec-04a12ea3c27d/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg"
  "calm.png"           = "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/85/ec/2a/85ec2ad8-1d29-c5e9-5f43-0eb4915eed48/AppIcon-0-0-1x_U007emarketing-0-11-0-85-220.png/512x512bb.jpg"
  "insight-timer.png"  = "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/9e/36/bb/9e36bb8c-f37b-eee9-b3aa-5dda1bdec1e3/AppIcon-0-0-1x_U007epad-0-1-85-220.png/512x512bb.jpg"
  "ibreathe.png"       = "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/00/16/09/00160966-729b-d193-4327-20772584af74/iBreathe-0-0-1x_U007epad-0-0-0-1-0-sRGB-85-220.png/512x512bb.jpg"
  "oak.png"            = "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/e9/ad/66/e9ad6698-a92f-b8a3-f6e0-f3f0e2629556/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg"
  "prana-breath.png"   = "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/e4/ad/2f/e4ad2f68-57e8-35eb-28e5-d957f077adf6/AppIcon-0-0-1x_U007emarketing-0-11-0-85-220.png/512x512bb.jpg"
  "wim-hof-method.png" = "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/49/e2/50/49e2509e-9916-69a5-05c5-180536cfa48f/prodAppIcon-0-0-1x_U007emarketing-0-8-0-sRGB-85-220.png/512x512bb.jpg"
  "othership.png"      = "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/9a/de/1f/9ade1f29-c990-e17e-22e2-914e4c9a5b11/AppIcon-0-0-1x_U007ephone-0-1-0-85-220.png/512x512bb.jpg"
}

foreach ($name in $map.Keys) {
  $tmp = Join-Path $env:TEMP ("if-icon-" + [guid]::NewGuid().ToString() + ".img")
  Invoke-WebRequest -Uri $map[$name] -OutFile $tmp

  $src = [System.Drawing.Image]::FromFile($tmp)
  $bmp = New-Object System.Drawing.Bitmap 112, 112
  $gfx = [System.Drawing.Graphics]::FromImage($bmp)
  $gfx.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  $gfx.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $gfx.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $gfx.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $gfx.DrawImage($src, 0, 0, 112, 112)
  $bmp.Save((Join-Path $dest $name), [System.Drawing.Imaging.ImageFormat]::Png)

  $gfx.Dispose()
  $bmp.Dispose()
  $src.Dispose()
}

# InnerFire icon fallback (brand-aligned dark tile + flame glyph)
$innerPath = Join-Path $dest "innerfire.png"
$innerBmp = New-Object System.Drawing.Bitmap 112, 112
$innerGfx = [System.Drawing.Graphics]::FromImage($innerBmp)
$innerGfx.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$innerGfx.Clear([System.Drawing.Color]::FromArgb(10, 18, 36))

for ($r = 58; $r -ge 18; $r -= 6) {
  $alpha = [Math]::Max(12, [int](130 - ($r * 1.8)))
  $glowBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb($alpha, 255, 132, 46))
  $innerGfx.FillEllipse($glowBrush, 56 - $r / 2, 56 - $r / 2, $r, $r)
  $glowBrush.Dispose()
}

$font = New-Object System.Drawing.Font("Segoe UI Emoji", 46, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$format = New-Object System.Drawing.StringFormat
$format.Alignment = [System.Drawing.StringAlignment]::Center
$format.LineAlignment = [System.Drawing.StringAlignment]::Center
$textBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
$innerGfx.DrawString([char]::ConvertFromUtf32(0x1F525), $font, $textBrush, (New-Object System.Drawing.RectangleF(0, 0, 112, 112)), $format)

$textBrush.Dispose()
$font.Dispose()
$format.Dispose()
$innerGfx.Dispose()
$innerBmp.Save($innerPath, [System.Drawing.Imaging.ImageFormat]::Png)
$innerBmp.Dispose()

Write-Output "TASK-032 icon set generated."

import Util from '../util/Util.js';
import UI   from '../ui/UI.js';
import Base from '../ui/Base.js';
var Surf3d,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } },
  hasProp = {}.hasOwnProperty;

Surf3d = class Surf3d extends Base {
  constructor(stream, ui) {
    super(stream, ui, 'Surf3d');
    this.ready = this.ready.bind(this);
    this.readyImage = this.readyImage.bind(this);
    this.readyPlots = this.readyPlots.bind(this);
    this.readyPivot = this.readyPivot.bind(this);
    this.contents = {
      Image: {},
      Plots: {},
      Pivot: {}
    };
    this.cname = 'Image';
    this.stream.subscribe("Select", "Surf3d", (select) => {
      return this.onSelect(select);
    });
  }

  ready(cname) {
    boundMethodCheck(this, Surf3d);
    switch (cname) {
      case 'Image':
        return this.readyImage();
      case 'Plots':
        return this.readyPlots();
      case 'Pivot':
        return this.readyPivot();
      default:
        console.error('Surf3d.ready() unknown cname', cname);
        this.cname = 'Image';
        return this.readyImage();
    }
  }

  onSelect(select) {
    switch (select.intent) {
      case UI.SelectView:
        return this.readyImage();
      case UI.SelectPane:
        return this.readyPlots();
      default:
        return this.readyImage();
    }
  }

  hide() {
    var con, key, ref, results;
    ref = this.contents;
    results = [];
    for (key in ref) {
      if (!hasProp.call(ref, key)) continue;
      con = ref[key];
      if (con.$ != null) {
        results.push(con.$.hide());
      } else {
        results.push(void 0);
      }
    }
    return results;
  }

  readyImage() {
    var $c, id, style;
    boundMethodCheck(this, Surf3d);
    this.cname = 'Image';
    if (this.contents.Image.$ == null) {
      id = this.name + this.cname;
      this.geom = this.pane.geom();
      style = `max-width:${this.geom.wp}px; max-height:${this.geom.hp}px;`;
      $c = $(`<div id="${id}"><img src="img/Surf3D.png" style="${style}" /></div>`);
      this.pane.$.append($c);
      this.contents.Image.$ = $c;
    }
    this.hide();
    return this.contents.Image.$.show();
  }

  readyPlots() {
    var $c, id;
    boundMethodCheck(this, Surf3d);
    this.cname = 'Plots';
    if (this.contents.Plots.$ == null) {
      id = this.name + this.cname;
      $c = $(`<div id="${id}" class="plotly-graph-div"></div>`);
      this.pane.$.append($c);
      this.contents.Plots.$ = $c;
      this.geom = this.pane.geom();
      //console.log( 'Geom', @geom )
      Plotly.plot(id, {
        data: this.data(),
        layout: this.layout(),
        frames: [],
        config: this.config()
      });
    }
    this.hide();
    this.contents.Plots.$.show();
  }

  readyPivot() {
    var $c, id;
    boundMethodCheck(this, Surf3d);
    if (this.contents.Pivot.$ == null) {
      id = this.name + this.cname;
      $c = $(`<h1 id="${id}" style=" display:grid; justify-self:center; align-self:center; ">${this.name}</h1>`);
      this.pane.$.append($c);
      this.contents.Pivot.$ = $c;
    }
    this.hide();
    return this.contents.Pivot.$.show();
  }

  config() {
    return {
      "mapboxAccessToken": "pk.eyJ1IjoiY2hyaWRkeXAiLCJhIjoiY2lxMnVvdm5iMDA4dnhsbTQ5aHJzcGs0MyJ9.X9o_rzNLNesDxdra4neC_A",
      "linkText": "Export to plot.ly",
      "showLink": true
    };
  }

  yaxis() {
    return {
      "domain": [0, 1],
      "showticklabels": true,
      "showexponent": "all",
      "gridwidth": 1,
      "gridcolor": "rgb(102, 102, 102)",
      "linecolor": "#444",
      "mirror": false,
      "nticks": 0,
      "linewidth": 1,
      "autorange": true,
      "showspikes": true,
      "position": 0,
      "tickmode": "auto",
      "spikecolor": "rgb(102, 102, 102)",
      "ticks": "",
      "spikesides": true,
      "spikethickness": 2,
      "rangemode": "normal",
      "overlaying": false,
      "zeroline": false,
      "type": "linear",
      "zerolinewidth": 1,
      "ticklen": 0,
      "backgroundcolor": "rgba(204, 204, 204, 0.5)",
      "tickcolor": "#444",
      "showline": true,
      "showgrid": true,
      "tickfont": {
        "color": "",
        "family": "",
        "size": 0
      },
      "tickwidth": 1,
      "tick0": 0,
      "tickangle": "auto",
      "showbackground": false,
      "dtick": 10,
      "showaxeslabels": true,
      "zerolinecolor": "#444",
      "range": [1, 33],
      "titlefont": {
        "color": "",
        "family": "",
        "size": 0
      },
      "exponentformat": "B"
    };
  }

  xaxis() {
    return {
      "domain": [0, 1],
      "showticklabels": true,
      "showexponent": "all",
      "gridwidth": 1,
      "gridcolor": "rgb(102, 102, 102)",
      "linecolor": "#444",
      "mirror": false,
      "nticks": 0,
      "linewidth": 1,
      "autorange": true,
      "showspikes": true,
      "position": 0,
      "tickmode": "auto",
      "spikecolor": "rgb(102, 102, 102)",
      "ticks": "",
      "spikesides": true,
      "spikethickness": 2,
      "rangemode": "normal",
      "overlaying": false,
      "zeroline": false,
      "type": "linear",
      "zerolinewidth": 1,
      "ticklen": 0,
      "backgroundcolor": "rgba(204, 204, 204, 0.5)",
      "tickcolor": "#444",
      "showline": true,
      "showgrid": true,
      "tickfont": {
        "color": "",
        "family": "",
        "size": 0
      },
      "tickwidth": 1,
      "tick0": 0,
      "tickangle": "auto",
      "showbackground": false,
      "dtick": 10,
      "showaxeslabels": true,
      "zerolinecolor": "#444",
      "range": [1, 33],
      "titlefont": {
        "color": "",
        "family": "",
        "size": 0
      },
      "exponentformat": "B"
    };
  }

  layout() {
    return {
      "boxmode": "overlay",
      "paper_bgcolor": "#fff",
      "scene": {
        "domain": {
          "y": [0, 1],
          "x": [0, 1]
        },
        "yaxis": this.yaxis(),
        "cameraposition": [
          {
            "1": 0.42470821738243103,
            "0": 0.17591989040374756,
            "3": 0.33985114097595215,
            "2": 0.8204732537269592
          },
          {
            "1": 0,
            "0": 0,
            "2": 0
          },
          2.165063509461097
        ],
        "bgcolor": "#fff",
        "camera": {
          "eye": {
            "y": 0.7418978781714733,
            "x": 1.7551619589862706,
            "z": 1.0278589572952816
          },
          "up": {
            "y": 0,
            "x": 0,
            "z": 1
          },
          "center": {
            "y": 0,
            "x": 0,
            "z": 0
          }
        },
        "zaxis": {
          "domain": [0, 1],
          "showticklabels": true,
          "showexponent": "all",
          "gridwidth": 1,
          "gridcolor": "rgb(102, 102, 102)",
          "linecolor": "#444",
          "mirror": false,
          "nticks": 0,
          "linewidth": 1,
          "autorange": true,
          "showspikes": true,
          "position": 0,
          "tickmode": "auto",
          "spikecolor": "rgb(102, 102, 102)",
          "ticks": "",
          "spikesides": true,
          "spikethickness": 2,
          "rangemode": "normal",
          "overlaying": false,
          "zeroline": false,
          "type": "-",
          "zerolinewidth": 1,
          "ticklen": 0,
          "backgroundcolor": "rgba(204, 204, 204, 0.5)",
          "tickcolor": "#444",
          "showline": true,
          "showgrid": true,
          "tickfont": {
            "color": "",
            "family": "",
            "size": 0
          },
          "tickwidth": 1,
          "tick0": 0,
          "tickangle": "auto",
          "showbackground": false,
          "dtick": 0.5,
          "showaxeslabels": true,
          "zerolinecolor": "#444",
          "range": [-0.2172289937734604, 1],
          "titlefont": {
            "color": "",
            "family": "",
            "size": 0
          },
          "exponentformat": "B"
        },
        "xaxis": this.xaxis(),
        "position": {
          "width": 410,
          "top": 40,
          "left": 20,
          "height": 330
        },
        "aspectratio": {
          "y": 1,
          "x": 1,
          "z": 1
        }
      },
      "height": this.geom['hv'],
      "titlefont": {
        "color": "",
        "family": "",
        "size": 0
      },
      "hovermode": "x",
      "font": {
        "color": "#444",
        "family": "\"Open sans\", verdana, arial, sans-serif",
        "size": 12
      },
      "autosize": false,
      "title": "",
      "plot_bgcolor": "rgba(0, 0, 0, 0)",
      "dragmode": "turntable",
      "smith": false,
      "width": this.geom['wv'],
      "bargap": 0.2,
      "bargroupgap": 0,
      "annotations": [
        {
          "yanchor": "bottom",
          "xref": "paper",
          "xanchor": "center",
          "yref": "paper",
          "text": "<b></b>",
          "align": "center",
          "y": 0.935,
          "x": 0.5175,
          "showarrow": false
        }
      ],
      "showlegend": false,
      "separators": ".,",
      "barmode": "group",
      "boxgap": 0.3,
      "legend": {
        "bordercolor": "#444",
        "bgcolor": "#fff",
        "font": {
          "color": "",
          "family": "",
          "size": 0
        },
        "borderwidth": 0,
        "traceorder": "normal"
      },
      "hidesources": false,
      "boxgroupgap": 0.3,
      "margin": {
        "b": 5,
        "l": 5,
        "r": 5,
        "pad": 0,
        "t": 5,
        "autoexpand": true
      }
    };
  }

  data() {
    return [
      {
        "showlegend": true,
        "showscale": false,
        "zmax": 1,
        "uid": "69842b",
        "yaxis": "y",
        "reversecale": false,
        "zmin": -0.217229,
        "colorscale": [[0,
      "rgb(5, 10, 172)"],
      [0.35,
      "rgb(106, 137, 247)"],
      [0.5,
      "rgb(190,190,190)"],
      [0.6,
      "rgb(220, 170, 132)"],
      [0.7,
      "rgb(230, 145, 90)"],
      [1,
      "rgb(178, 10, 28)"]],
        "autocolorscale": false,
        "visible": true,
        "xaxis": "x",
        "y": [1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
      31,
      32,
      33],
        "x": [1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
      31,
      32,
      33],
        "z": [[-0.083953,
      -0.091152,
      -0.087861,
      -0.074957,
      -0.054402,
      -0.028809,
      -0.000976,
      0.026531,
      0.051679,
      0.07313,
      0.090266,
      0.103089,
      0.112059,
      0.117888,
      0.121354,
      0.123131,
      0.12367,
      0.123131,
      0.121354,
      0.117888,
      0.112059,
      0.103089,
      0.090266,
      0.07313,
      0.051679,
      0.026531,
      -0.000976,
      -0.028809,
      -0.054402,
      -0.074957,
      -0.087861,
      -0.091152,
      -0.083953],
      [-0.091152,
      -0.087238,
      -0.072216,
      -0.048301,
      -0.01863,
      0.013324,
      0.044313,
      0.071745,
      0.09394,
      0.1102,
      0.12071,
      0.126322,
      0.128288,
      0.127994,
      0.126735,
      0.12554,
      0.125067,
      0.12554,
      0.126735,
      0.127994,
      0.128288,
      0.126322,
      0.12071,
      0.1102,
      0.09394,
      0.071745,
      0.044313,
      0.013324,
      -0.01863,
      -0.048301,
      -0.072216,
      -0.087238,
      -0.091152],
      [-0.087861,
      -0.072216,
      -0.046173,
      -0.013333,
      0.022105,
      0.056062,
      0.085188,
      0.107264,
      0.121354,
      0.127726,
      0.127599,
      0.12279,
      0.115356,
      0.10728,
      0.100248,
      0.095518,
      0.093855,
      0.095518,
      0.100248,
      0.10728,
      0.115356,
      0.12279,
      0.127599,
      0.127726,
      0.121354,
      0.107264,
      0.085188,
      0.056062,
      0.022105,
      -0.013333,
      -0.046173,
      -0.072216,
      -0.087861],
      [-0.074957,
      -0.048301,
      -0.013333,
      0.025054,
      0.061846,
      0.092729,
      0.114689,
      0.126322,
      0.127814,
      0.120673,
      0.10728,
      0.090402,
      0.07275,
      0.056666,
      0.04396,
      0.035868,
      0.033095,
      0.035868,
      0.04396,
      0.056666,
      0.07275,
      0.090402,
      0.10728,
      0.120673,
      0.127814,
      0.126322,
      0.114689,
      0.092729,
      0.061846,
      0.025054,
      -0.013333,
      -0.048301,
      -0.074957],
      [-0.054402,
      -0.01863,
      0.022105,
      0.061846,
      0.095137,
      0.117888,
      0.127914,
      0.125067,
      0.110992,
      0.088611,
      0.061468,
      0.033095,
      0.006539,
      -0.015905,
      -0.032729,
      -0.043082,
      -0.046569,
      -0.043082,
      -0.032729,
      -0.015905,
      0.006539,
      0.033095,
      0.061468,
      0.088611,
      0.110992,
      0.125067,
      0.127914,
      0.117888,
      0.095137,
      0.061846,
      0.022105,
      -0.01863,
      -0.054402],
      [-0.028809,
      0.013324,
      0.056062,
      0.092729,
      0.117888,
      0.128196,
      0.12279,
      0.103188,
      0.07275,
      0.035868,
      -0.002905,
      -0.039612,
      -0.071361,
      -0.096468,
      -0.114283,
      -0.12481,
      -0.12828,
      -0.12481,
      -0.114283,
      -0.096468,
      -0.071361,
      -0.039612,
      -0.002905,
      0.035868,
      0.07275,
      0.103188,
      0.12279,
      0.128196,
      0.117888,
      0.092729,
      0.056062,
      0.013324,
      -0.028809],
      [-0.000976,
      0.044313,
      0.085188,
      0.114689,
      0.127914,
      0.12279,
      0.100248,
      0.063807,
      0.018686,
      -0.029318,
      -0.074941,
      -0.114283,
      -0.145231,
      -0.167396,
      -0.18164,
      -0.189366,
      -0.191785,
      -0.189366,
      -0.18164,
      -0.167396,
      -0.145231,
      -0.114283,
      -0.074941,
      -0.029318,
      0.018686,
      0.063807,
      0.100248,
      0.12279,
      0.127914,
      0.114689,
      0.085188,
      0.044313,
      -0.000976],
      [0.026531,
      0.071745,
      0.107264,
      0.126322,
      0.125067,
      0.103188,
      0.063807,
      0.012679,
      -0.043082,
      -0.096468,
      -0.141902,
      -0.176131,
      -0.198521,
      -0.210717,
      -0.215789,
      -0.217107,
      -0.217229,
      -0.217107,
      -0.215789,
      -0.210717,
      -0.198521,
      -0.176131,
      -0.141902,
      -0.096468,
      -0.043082,
      0.012679,
      0.063807,
      0.103188,
      0.125067,
      0.126322,
      0.107264,
      0.071745,
      0.026531],
      [0.051679,
      0.09394,
      0.121354,
      0.127814,
      0.110992,
      0.07275,
      0.018686,
      -0.043082,
      -0.103622,
      -0.154996,
      -0.191785,
      -0.211997,
      -0.217184,
      -0.211748,
      -0.201629,
      -0.192695,
      -0.189201,
      -0.192695,
      -0.201629,
      -0.211748,
      -0.217184,
      -0.211997,
      -0.191785,
      -0.154996,
      -0.103622,
      -0.043082,
      0.018686,
      0.07275,
      0.110992,
      0.127814,
      0.121354,
      0.09394,
      0.051679],
      [0.07313,
      0.1102,
      0.127726,
      0.120673,
      0.088611,
      0.035868,
      -0.029318,
      -0.096468,
      -0.154996,
      -0.196366,
      -0.215789,
      -0.213112,
      -0.192695,
      -0.162315,
      -0.131337,
      -0.108564,
      -0.100224,
      -0.108564,
      -0.131337,
      -0.162315,
      -0.192695,
      -0.213112,
      -0.215789,
      -0.196366,
      -0.154996,
      -0.096468,
      -0.029318,
      0.035868,
      0.088611,
      0.120673,
      0.127726,
      0.1102,
      0.07313],
      [0.090266,
      0.12071,
      0.127599,
      0.10728,
      0.061468,
      -0.002905,
      -0.074941,
      -0.141902,
      -0.191785,
      -0.215789,
      -0.210172,
      -0.177069,
      -0.124112,
      -0.062882,
      -0.006541,
      0.032894,
      0.04704,
      0.032894,
      -0.006541,
      -0.062882,
      -0.124112,
      -0.177069,
      -0.210172,
      -0.215789,
      -0.191785,
      -0.141902,
      -0.074941,
      -0.002905,
      0.061468,
      0.10728,
      0.127599,
      0.12071,
      0.090266],
      [0.103089,
      0.126322,
      0.12279,
      0.090402,
      0.033095,
      -0.039612,
      -0.114283,
      -0.176131,
      -0.211997,
      -0.213112,
      -0.177069,
      -0.108564,
      -0.01872,
      0.076898,
      0.161211,
      0.218901,
      0.239389,
      0.218901,
      0.161211,
      0.076898,
      -0.01872,
      -0.108564,
      -0.177069,
      -0.213112,
      -0.211997,
      -0.176131,
      -0.114283,
      -0.039612,
      0.033095,
      0.090402,
      0.12279,
      0.126322,
      0.103089],
      [0.112059,
      0.128288,
      0.115356,
      0.07275,
      0.006539,
      -0.071361,
      -0.145231,
      -0.198521,
      -0.217184,
      -0.192695,
      -0.124112,
      -0.01872,
      0.10892,
      0.239389,
      0.351845,
      0.427821,
      0.454649,
      0.427821,
      0.351845,
      0.239389,
      0.10892,
      -0.01872,
      -0.124112,
      -0.192695,
      -0.217184,
      -0.198521,
      -0.145231,
      -0.071361,
      0.006539,
      0.07275,
      0.115356,
      0.128288,
      0.112059],
      [0.117888,
      0.127994,
      0.10728,
      0.056666,
      -0.015905,
      -0.096468,
      -0.167396,
      -0.210717,
      -0.211748,
      -0.162315,
      -0.062882,
      0.076898,
      0.239389,
      0.401755,
      0.539842,
      0.632422,
      0.664997,
      0.632422,
      0.539842,
      0.401755,
      0.239389,
      0.076898,
      -0.062882,
      -0.162315,
      -0.211748,
      -0.210717,
      -0.167396,
      -0.096468,
      -0.015905,
      0.056666,
      0.10728,
      0.127994,
      0.117888],
      [0.121354,
      0.126735,
      0.100248,
      0.04396,
      -0.032729,
      -0.114283,
      -0.18164,
      -0.215789,
      -0.201629,
      -0.131337,
      -0.006541,
      0.161211,
      0.351845,
      0.539842,
      0.698456,
      0.804307,
      0.841471,
      0.804307,
      0.698456,
      0.539842,
      0.351845,
      0.161211,
      -0.006541,
      -0.131337,
      -0.201629,
      -0.215789,
      -0.18164,
      -0.114283,
      -0.032729,
      0.04396,
      0.100248,
      0.126735,
      0.121354],
      [0.123131,
      0.12554,
      0.095518,
      0.035868,
      -0.043082,
      -0.12481,
      -0.189366,
      -0.217107,
      -0.192695,
      -0.108564,
      0.032894,
      0.218901,
      0.427821,
      0.632422,
      0.804307,
      0.918725,
      0.958851,
      0.918725,
      0.804307,
      0.632422,
      0.427821,
      0.218901,
      0.032894,
      -0.108564,
      -0.192695,
      -0.217107,
      -0.189366,
      -0.12481,
      -0.043082,
      0.035868,
      0.095518,
      0.12554,
      0.123131],
      [0.12367,
      0.125067,
      0.093855,
      0.033095,
      -0.046569,
      -0.12828,
      -0.191785,
      -0.217229,
      -0.189201,
      -0.100224,
      0.04704,
      0.239389,
      0.454649,
      0.664997,
      0.841471,
      0.958851,
      1,
      0.958851,
      0.841471,
      0.664997,
      0.454649,
      0.239389,
      0.04704,
      -0.100224,
      -0.189201,
      -0.217229,
      -0.191785,
      -0.12828,
      -0.046569,
      0.033095,
      0.093855,
      0.125067,
      0.12367],
      [0.123131,
      0.12554,
      0.095518,
      0.035868,
      -0.043082,
      -0.12481,
      -0.189366,
      -0.217107,
      -0.192695,
      -0.108564,
      0.032894,
      0.218901,
      0.427821,
      0.632422,
      0.804307,
      0.918725,
      0.958851,
      0.918725,
      0.804307,
      0.632422,
      0.427821,
      0.218901,
      0.032894,
      -0.108564,
      -0.192695,
      -0.217107,
      -0.189366,
      -0.12481,
      -0.043082,
      0.035868,
      0.095518,
      0.12554,
      0.123131],
      [0.121354,
      0.126735,
      0.100248,
      0.04396,
      -0.032729,
      -0.114283,
      -0.18164,
      -0.215789,
      -0.201629,
      -0.131337,
      -0.006541,
      0.161211,
      0.351845,
      0.539842,
      0.698456,
      0.804307,
      0.841471,
      0.804307,
      0.698456,
      0.539842,
      0.351845,
      0.161211,
      -0.006541,
      -0.131337,
      -0.201629,
      -0.215789,
      -0.18164,
      -0.114283,
      -0.032729,
      0.04396,
      0.100248,
      0.126735,
      0.121354],
      [0.117888,
      0.127994,
      0.10728,
      0.056666,
      -0.015905,
      -0.096468,
      -0.167396,
      -0.210717,
      -0.211748,
      -0.162315,
      -0.062882,
      0.076898,
      0.239389,
      0.401755,
      0.539842,
      0.632422,
      0.664997,
      0.632422,
      0.539842,
      0.401755,
      0.239389,
      0.076898,
      -0.062882,
      -0.162315,
      -0.211748,
      -0.210717,
      -0.167396,
      -0.096468,
      -0.015905,
      0.056666,
      0.10728,
      0.127994,
      0.117888],
      [0.112059,
      0.128288,
      0.115356,
      0.07275,
      0.006539,
      -0.071361,
      -0.145231,
      -0.198521,
      -0.217184,
      -0.192695,
      -0.124112,
      -0.01872,
      0.10892,
      0.239389,
      0.351845,
      0.427821,
      0.454649,
      0.427821,
      0.351845,
      0.239389,
      0.10892,
      -0.01872,
      -0.124112,
      -0.192695,
      -0.217184,
      -0.198521,
      -0.145231,
      -0.071361,
      0.006539,
      0.07275,
      0.115356,
      0.128288,
      0.112059],
      [0.103089,
      0.126322,
      0.12279,
      0.090402,
      0.033095,
      -0.039612,
      -0.114283,
      -0.176131,
      -0.211997,
      -0.213112,
      -0.177069,
      -0.108564,
      -0.01872,
      0.076898,
      0.161211,
      0.218901,
      0.239389,
      0.218901,
      0.161211,
      0.076898,
      -0.01872,
      -0.108564,
      -0.177069,
      -0.213112,
      -0.211997,
      -0.176131,
      -0.114283,
      -0.039612,
      0.033095,
      0.090402,
      0.12279,
      0.126322,
      0.103089],
      [0.090266,
      0.12071,
      0.127599,
      0.10728,
      0.061468,
      -0.002905,
      -0.074941,
      -0.141902,
      -0.191785,
      -0.215789,
      -0.210172,
      -0.177069,
      -0.124112,
      -0.062882,
      -0.006541,
      0.032894,
      0.04704,
      0.032894,
      -0.006541,
      -0.062882,
      -0.124112,
      -0.177069,
      -0.210172,
      -0.215789,
      -0.191785,
      -0.141902,
      -0.074941,
      -0.002905,
      0.061468,
      0.10728,
      0.127599,
      0.12071,
      0.090266],
      [0.07313,
      0.1102,
      0.127726,
      0.120673,
      0.088611,
      0.035868,
      -0.029318,
      -0.096468,
      -0.154996,
      -0.196366,
      -0.215789,
      -0.213112,
      -0.192695,
      -0.162315,
      -0.131337,
      -0.108564,
      -0.100224,
      -0.108564,
      -0.131337,
      -0.162315,
      -0.192695,
      -0.213112,
      -0.215789,
      -0.196366,
      -0.154996,
      -0.096468,
      -0.029318,
      0.035868,
      0.088611,
      0.120673,
      0.127726,
      0.1102,
      0.07313],
      [0.051679,
      0.09394,
      0.121354,
      0.127814,
      0.110992,
      0.07275,
      0.018686,
      -0.043082,
      -0.103622,
      -0.154996,
      -0.191785,
      -0.211997,
      -0.217184,
      -0.211748,
      -0.201629,
      -0.192695,
      -0.189201,
      -0.192695,
      -0.201629,
      -0.211748,
      -0.217184,
      -0.211997,
      -0.191785,
      -0.154996,
      -0.103622,
      -0.043082,
      0.018686,
      0.07275,
      0.110992,
      0.127814,
      0.121354,
      0.09394,
      0.051679],
      [0.026531,
      0.071745,
      0.107264,
      0.126322,
      0.125067,
      0.103188,
      0.063807,
      0.012679,
      -0.043082,
      -0.096468,
      -0.141902,
      -0.176131,
      -0.198521,
      -0.210717,
      -0.215789,
      -0.217107,
      -0.217229,
      -0.217107,
      -0.215789,
      -0.210717,
      -0.198521,
      -0.176131,
      -0.141902,
      -0.096468,
      -0.043082,
      0.012679,
      0.063807,
      0.103188,
      0.125067,
      0.126322,
      0.107264,
      0.071745,
      0.026531],
      [-0.000976,
      0.044313,
      0.085188,
      0.114689,
      0.127914,
      0.12279,
      0.100248,
      0.063807,
      0.018686,
      -0.029318,
      -0.074941,
      -0.114283,
      -0.145231,
      -0.167396,
      -0.18164,
      -0.189366,
      -0.191785,
      -0.189366,
      -0.18164,
      -0.167396,
      -0.145231,
      -0.114283,
      -0.074941,
      -0.029318,
      0.018686,
      0.063807,
      0.100248,
      0.12279,
      0.127914,
      0.114689,
      0.085188,
      0.044313,
      -0.000976],
      [-0.028809,
      0.013324,
      0.056062,
      0.092729,
      0.117888,
      0.128196,
      0.12279,
      0.103188,
      0.07275,
      0.035868,
      -0.002905,
      -0.039612,
      -0.071361,
      -0.096468,
      -0.114283,
      -0.12481,
      -0.12828,
      -0.12481,
      -0.114283,
      -0.096468,
      -0.071361,
      -0.039612,
      -0.002905,
      0.035868,
      0.07275,
      0.103188,
      0.12279,
      0.128196,
      0.117888,
      0.092729,
      0.056062,
      0.013324,
      -0.028809],
      [-0.054402,
      -0.01863,
      0.022105,
      0.061846,
      0.095137,
      0.117888,
      0.127914,
      0.125067,
      0.110992,
      0.088611,
      0.061468,
      0.033095,
      0.006539,
      -0.015905,
      -0.032729,
      -0.043082,
      -0.046569,
      -0.043082,
      -0.032729,
      -0.015905,
      0.006539,
      0.033095,
      0.061468,
      0.088611,
      0.110992,
      0.125067,
      0.127914,
      0.117888,
      0.095137,
      0.061846,
      0.022105,
      -0.01863,
      -0.054402],
      [-0.074957,
      -0.048301,
      -0.013333,
      0.025054,
      0.061846,
      0.092729,
      0.114689,
      0.126322,
      0.127814,
      0.120673,
      0.10728,
      0.090402,
      0.07275,
      0.056666,
      0.04396,
      0.035868,
      0.033095,
      0.035868,
      0.04396,
      0.056666,
      0.07275,
      0.090402,
      0.10728,
      0.120673,
      0.127814,
      0.126322,
      0.114689,
      0.092729,
      0.061846,
      0.025054,
      -0.013333,
      -0.048301,
      -0.074957],
      [-0.087861,
      -0.072216,
      -0.046173,
      -0.013333,
      0.022105,
      0.056062,
      0.085188,
      0.107264,
      0.121354,
      0.127726,
      0.127599,
      0.12279,
      0.115356,
      0.10728,
      0.100248,
      0.095518,
      0.093855,
      0.095518,
      0.100248,
      0.10728,
      0.115356,
      0.12279,
      0.127599,
      0.127726,
      0.121354,
      0.107264,
      0.085188,
      0.056062,
      0.022105,
      -0.013333,
      -0.046173,
      -0.072216,
      -0.087861],
      [-0.091152,
      -0.087238,
      -0.072216,
      -0.048301,
      -0.01863,
      0.013324,
      0.044313,
      0.071745,
      0.09394,
      0.1102,
      0.12071,
      0.126322,
      0.128288,
      0.127994,
      0.126735,
      0.12554,
      0.125067,
      0.12554,
      0.126735,
      0.127994,
      0.128288,
      0.126322,
      0.12071,
      0.1102,
      0.09394,
      0.071745,
      0.044313,
      0.013324,
      -0.01863,
      -0.048301,
      -0.072216,
      -0.087238,
      -0.091152],
      [-0.083953,
      -0.091152,
      -0.087861,
      -0.074957,
      -0.054402,
      -0.028809,
      -0.000976,
      0.026531,
      0.051679,
      0.07313,
      0.090266,
      0.103089,
      0.112059,
      0.117888,
      0.121354,
      0.123131,
      0.12367,
      0.123131,
      0.121354,
      0.117888,
      0.112059,
      0.103089,
      0.090266,
      0.07313,
      0.051679,
      0.026531,
      -0.000976,
      -0.028809,
      -0.054402,
      -0.074957,
      -0.087861,
      -0.091152,
      -0.083953]],
        "type": "surface",
        "name": ""
      }
    ];
  }

};

export default Surf3d;

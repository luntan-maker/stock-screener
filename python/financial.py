import yfinance as yf

import pandas as pd

def sma(ticker, hist_of, range, interval):
    df = yf.Ticker(ticker)
    df = df.history(hist_of, interval="1mo")#1y
    df.drop(columns=['Dividends', 'Stock Splits'], inplace=True)
    range = int(range)
    return df.rolling(range).mean().to_json()

def regularData(ticker, hist_of, interval):
    df = yf.Ticker(ticker)
    df = df.history(hist_of, interval=interval)
    return df.to_json()
